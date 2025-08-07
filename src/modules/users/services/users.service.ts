import {ConflictException, Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities";
import {DataSource, In, Repository} from "typeorm";
import {RoleEntity} from "../../roles/entities";
import {AssignRoleDto} from "../dtos/assign-role.dto";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {PermissionEntity} from "../../permissions/entities";

@Injectable()
export class UsersService implements OnModuleInit {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleEntity: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionEntity: Repository<PermissionEntity>,
        private dataSource: DataSource,
        private configService: ConfigService
    ) {
    }

    async create(email: string, hashedPassword: string): Promise<UserEntity> {
        const user = this.userEntity.create({email, password: hashedPassword});
        return await this.userEntity.save(user);
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.userEntity.findOne({where: {email}});
    }

    async findOneWithRoles(id: number): Promise<UserEntity | null> {
        return this.userEntity.findOne({
            where: {id},
            relations: ['roles', 'roles.permissions'],
        });
    }

    async assignRoleToUser(userId: number, payload: AssignRoleDto) {
        const user = await this.userEntity.findOne({
            where: {
                id: userId
            },
            relations: ['roles']
        });

        if (!user) {
            throw new NotFoundException('UserNotFound');
        }

        const roles = await this.roleEntity.find({
            where: {
                id: In(payload.roleIds)
            }
        });

        user.roles = roles;

        await this.userEntity.save(user);
    }

    async onModuleInit(): Promise<void> {
        // await this.createRootUser()
    }

    async createRootUser() {
        const isCreateRoot = this.configService.get<string>('IS_CREATE_ROOT');
        const rootEmail = this.configService.get<string>('ROOT_USER_EMAIL');
        const rootPassword = this.configService.get<string>('ROOT_USER_PASSWORD');

        if (isCreateRoot !== 'true') return;

        await this.dataSource.transaction(async (entityManager) => {
            if (rootPassword === undefined || rootEmail === undefined) throw new ConflictException('RootPasswordOrEmailNotFound');

            const existingRootUser = await this.userEntity.findOne({
                where: {
                    email: rootEmail
                }
            });
            if (existingRootUser) return;

            const requiredPermissionNames = ['CREATE_PERMISSION', 'CREATE_ROLE', 'ASSIGN_ROLE'];

            let permissions: PermissionEntity[] = [];
            for (const name of requiredPermissionNames) {
                let permission = await this.permissionEntity.findOne({where: {name}});
                if (!permission) {
                    permission = this.permissionEntity.create({name});
                    await this.permissionEntity.save(permission);
                }
                permissions.push(permission);
            }

            const rootRole = this.roleEntity.create({
                name: 'root',
                permissions: permissions
            });
            await this.roleEntity.save(rootRole);

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(rootPassword, salt);

            const rootUser = this.userEntity.create({
                email: rootEmail,
                password: hashedPassword,
                roles: [rootRole]
            });

            await this.userEntity.save(rootUser);
            console.log('Root user successfully created with role and permissions!');
        })

    }

}

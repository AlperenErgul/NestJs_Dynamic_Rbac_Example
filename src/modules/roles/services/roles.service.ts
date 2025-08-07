import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "../entities";
import {In, Repository} from "typeorm";
import {PermissionEntity} from "../../permissions/entities";
import {CreateRoleDto} from "../dtos/create-role.dto";

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleEntity: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionEntity: Repository<PermissionEntity>
    ) {
    }

    async create(payload: CreateRoleDto): Promise<RoleEntity> {
        const exist = await this.roleEntity.findOne({
            where: {
                name: payload.name
            }
        });
        if (exist) {
            throw new ConflictException('ThisRoleAlreadyExistWithThisName')
        }

        let permissions: PermissionEntity[] = [];
        if (payload.permissionIds && payload.permissionIds.length > 0) {
            permissions = await this.permissionEntity.find({
                where:{
                    id: In(payload.permissionIds)
                }
            })
            console.log(permissions);
        }


        const newRole = this.roleEntity.create({
            name: payload.name,
            permissions: permissions
        });
        return await this.roleEntity.save(newRole);
    }



}

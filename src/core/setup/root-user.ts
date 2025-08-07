import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../../modules/users/entities";
import {RoleEntity} from "../../modules/roles/entities";
import {PermissionEntity} from "../../modules/permissions/entities";
import process from "process";
import * as bcrypt from "bcrypt";
import {ConflictException} from "@nestjs/common";


export async function createRootUser(dataSource: DataSource, configService: ConfigService) {
    const isCreateRoot = configService.get<string>('IS_CREATE_ROOT');
    const rootEmail = configService.get<string>('ROOT_USER_EMAIL');
    const rootPassword = configService.get<string>('ROOT_USER_PASSWORD');
    console.log(isCreateRoot);

    if (isCreateRoot != 'true') return;



    await dataSource.transaction(async (entityManager) => {
        if (rootPassword === undefined || rootEmail === undefined) throw new ConflictException('RootPasswordOrEmailNotFound');

        const userEntity = entityManager.getRepository(UserEntity);
        const roleEntity = entityManager.getRepository(RoleEntity);
        const permissionEntity = entityManager.getRepository(PermissionEntity);

        const existingRootUser = await userEntity.findOne({
            where:{
                email: rootEmail
            }
        });
        console.log(existingRootUser)
        if (existingRootUser) return;


        const requiredPermissionNames = ['CREATE_PERMISSION', 'CREATE_ROLE', 'ASSIGN_ROLE'];

        let permissions: PermissionEntity[] = [];
        for (const name of requiredPermissionNames) {
            let permission = await permissionEntity.findOne({ where: { name } });
            if (!permission) {
                permission = permissionEntity.create({ name });
                await permissionEntity.save(permission);
            }
            permissions.push(permission);
        }

        const rootRole = roleEntity.create({
            name: 'root',
            permissions: permissions
        });
        await roleEntity.save(rootRole);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(rootPassword, salt);

        const rootUser = userEntity.create({
            email: rootEmail,
            password: hashedPassword,
            roles: [rootRole]
        });

        await userEntity.save(rootUser);
        console.log('Root user successfully created with role and permissions!');
    })

}

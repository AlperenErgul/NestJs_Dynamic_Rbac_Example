import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PermissionEntity} from "../entities";
import {Repository} from "typeorm";
import {CreatePermissionDto} from "../dtos";

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionEntity: Repository<PermissionEntity>
    ) {
    }

    async createPermission(payload: CreatePermissionDto): Promise<PermissionEntity> {
        const exist = await this.permissionEntity.findOne({
            where: {
                name: payload.name
            }
        });
        if (exist) {
            throw new ConflictException('PermissionAlreadyExistWithThisName');
        }

        const newPermission = this.permissionEntity.create(payload);
        return await this.permissionEntity.save(newPermission);
    }

}

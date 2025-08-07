import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {RoleEntity} from "../../roles/entities";

@Entity()
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => RoleEntity, (role: RoleEntity) => role.permissions)
    roles: RoleEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

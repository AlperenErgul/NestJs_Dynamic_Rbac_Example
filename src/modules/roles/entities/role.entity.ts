import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PermissionEntity} from "../../permissions/entities";
import {UserEntity} from "../../users/entities";


@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(()=> PermissionEntity, (permission: PermissionEntity) => permission.roles, {eager: true})
    @JoinTable()
    permissions: PermissionEntity[];

    @ManyToMany(()=> UserEntity, (user:UserEntity) => user.roles)
    users: UserEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

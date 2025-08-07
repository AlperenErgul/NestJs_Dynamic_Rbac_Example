import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {RoleEntity} from "../../roles/entities";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({})
    password: string;

    @ManyToMany(()=> RoleEntity, (role: RoleEntity) => role.users, {
        eager: true
    })
    @JoinTable()
    roles: RoleEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

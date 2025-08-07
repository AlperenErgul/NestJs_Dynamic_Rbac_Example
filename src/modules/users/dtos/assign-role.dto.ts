import {ArrayNotEmpty, IsArray, IsInt} from "class-validator";

export class AssignRoleDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    roleIds: number[];
}

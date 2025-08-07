import {IsArray, IsNumber, IsOptional, IsString, MinLength} from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    permissionIds?: number[];
}

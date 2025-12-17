import { IsNotEmpty, IsOptional, IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}

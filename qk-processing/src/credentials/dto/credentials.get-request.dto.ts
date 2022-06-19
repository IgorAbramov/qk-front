import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString, IsNotEmpty, Min, Max } from "class-validator";

/**
 * Data Transfer Object with credentials GET request data
 */
export class CredentialsGetRequestDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
  public readonly uuid?: string = null;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly offset?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(10)
    @Max(50)
    public readonly limit?: number = 10;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly filter?: string = null;
}
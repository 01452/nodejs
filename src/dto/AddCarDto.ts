import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";

export default class AddCarDto {
    @IsString()
    @IsNotEmpty()
    reqNumber!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @IsString()
    @IsNotEmpty()
    company!: string;

    @IsNumber()
    @Min(0.8)
    @Max(6.0)
    engineVolume!: number;

    @IsString()
    @IsNotEmpty()
    color!: string;
}

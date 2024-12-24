import { plainToClass } from "class-transformer";
import AddCarDto from "../dto/AddCarDto";
import Car from "../models/Car";

// Маппинг с использованием class-transformer
export const carMapper = (carDto: AddCarDto): Car => {
    return plainToClass(Car, {
        reqNumber: carDto.reqNumber,
        model: carDto.model,
        company: carDto.company,
        engine: carDto.engineVolume, // Соответствие полей
        color: carDto.color
    });
};
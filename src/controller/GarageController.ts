import GarageService from "../services/GarageService";
import AddCarDto from "../dto/AddCarDto";
import Car from "../models/Car";
import {carMapper} from "../utils/mapper";

export default class GarageController {
    private garageService: GarageService;

    constructor(garageService: GarageService) {
        this.garageService = garageService;
    }

    addCar(carDto: AddCarDto): boolean {
        const car = carMapper(carDto);
        return this.garageService.addCar(car);
    }

    removeCar(reqNumber: string): Car | null {
        return this.garageService.removeCar(reqNumber);
    }

    findCarByRegNumber(regNumber: string): Car | null {
        return this.garageService.findCarByRegNumber(regNumber);
    }

    findCarsByModel(model: string): Car[] {
        return this.garageService.findCarsByModel(model);
    }

    findCarsByCompany(company: string): Car[] {
        return this.garageService.findCarsByCompany(company);
    }

    findCarsByEngine(min: number, max: number): Car[] {
        return this.garageService.findCarsByEngine(min, max);
    }

    findCarsByColor(color: string): Car[] {
        return this.garageService.findCarsByColor(color);
    }
}

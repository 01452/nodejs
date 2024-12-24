import Car from "../models/Car";
import GarageService from "./GarageService";
import GarageRepository from "../dao/GarageRepository";

export default class GarageServiceImpl implements GarageService {
    private readonly repository: GarageRepository;

    constructor(repository: GarageRepository) {
        this.repository = repository;
    }

    addCar(car: Car): boolean {
        const cars = this.repository.readAll();
        if (cars.find(c => c.reqNumber === car.reqNumber)) {
            console.error(`Car with regNumber ${car.reqNumber} already exists`);
            return false;
        }
        cars.push(car);
        return this.repository.writeAll(cars);
    }

    removeCar(reqNumber: string): Car {
        const cars = this.repository.readAll();
        const index = cars.findIndex(c => c.reqNumber === reqNumber);
        if (index === -1) {
            console.error(`Car with regNumber ${reqNumber} not found`);
            return null;
        }
        const [removedCar] = cars.splice(index, 1);
        this.repository.writeAll(cars);
        return removedCar;
    }

    findCarByRegNumber(regNumber: string): Car {
        const cars = this.repository.readAll();
        return cars.find(c => c.reqNumber === regNumber) || null;
    }

    findCarsByModel(model: string): Car[] {
        const cars = this.repository.readAll();
        return cars.filter(c => c.model.toLowerCase() === model.toLowerCase());
    }

    findCarsByCompany(company: string): Car[] {
        const cars = this.repository.readAll();
        return cars.filter(c => c.company.toLowerCase() === company.toLowerCase());
    }

    findCarsByEngine(min: number, max: number): Car[] {
        const cars = this.repository.readAll();
        return cars.filter(c => c.engineVolume >= min && c.engineVolume <= max);
    }

    findCarsByColor(color: string): Car[] {
        const cars = this.repository.readAll();
        return cars.filter(c => c.color.toLowerCase() === color.toLowerCase());
    }
}

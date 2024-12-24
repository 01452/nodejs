import Car from "../models/Car";

export default interface GarageService {
    addCar(car: Car): boolean;

    removeCar(reqNumber: string): Car;

    findCarByRegNumber(regNumber: string): Car;

    findCarsByModel(model: string): Car[];

    findCarsByCompany(company: string): Car[] ;

    findCarsByEngine(min: number, max: number): Car[];

    findCarsByColor(color: string): Car[];

}
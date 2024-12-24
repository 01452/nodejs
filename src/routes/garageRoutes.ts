import { Router } from "express";
import GarageController from "../controller/GarageController";
import GarageRepository from "../dao/GarageRepository";
import GarageServiceImpl from "../services/GarageServiceImpl";
import { body, query } from "express-validator";
import validationMiddleware from "../middleware/validationMiddleware";
import AddCarDto from "../dto/AddCarDto";

const router = Router();

const repository = new GarageRepository();
const service = new GarageServiceImpl(repository);
const controller = new GarageController(service);

router.post(
    "/addCar",
    body("reqNumber").isString().notEmpty(),
    body("model").isString().notEmpty(),
    body("company").isString().notEmpty(),
    body("engineVolume").isFloat({ min: 0.8, max: 6.0 }),
    body("color").isString().notEmpty(),
    validationMiddleware,
    (req, res) => {
        const carDto: AddCarDto = req.body;
        const isSuccess = controller.addCar(carDto);
         isSuccess
            ? res.status(200).send("Car added successfully")
            : res.status(400).send("Car already exists");
    }
);

router.delete('/car/:reqNumber', async (req, res) => {
    const { reqNumber } = req.params;
    const car = await controller.removeCar(reqNumber);

    if (car) {
        res.status(200).send({car});
    } else {
        res.status(404).json({ error: "Car not found" });
    }
});

router.get("/findCarByRegNumber/:regNumber",async (req, res) => {
    const regNumber = req.params.regNumber;
    const car = controller.findCarByRegNumber(regNumber);
    if (car) {
        res.status(200).json({car});
    } else {
        res.status(404).send("Car not found");
    }
});

router.get("/findCarsByModel/:model", (req, res) => {
    const model = req.params.model;
    const cars = controller.findCarsByModel(model);
    res.status(200).json(cars);
});

router.get("/findCarsByCompany/:company", (req, res) => {
    const company = req.params.company;
    const cars = controller.findCarsByCompany(company);
    res.status(200).json(cars);
});

router.get(
    "/findCarsByEngine",
    query("min").isFloat({ min: 0 }).notEmpty(),
    query("max").isFloat({ min: 0 }).notEmpty(),
    validationMiddleware,
    (req, res) => {
        const min = parseFloat(req.query.min as string);
        const max = parseFloat(req.query.max as string);
        const cars = controller.findCarsByEngine(min, max);
        res.status(200).json(cars);
    }
);

router.get("/findCarsByColor/:color", (req, res) => {
    const color = req.params.color;
    const cars = controller.findCarsByColor(color);
    res.status(200).json(cars);
});

export default router;

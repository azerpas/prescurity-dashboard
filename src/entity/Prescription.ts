import {Patient} from "./Patient";
import {Doctor} from "./Doctor";
import {Pharmacy} from "./Pharmacy";

export class Prescription {
    private _id : number;
    private _patient : Patient;
    private _doctor : Doctor;
    private _pharmacy : Pharmacy;
    private _medicine : string;
    private _disease : string;
    // TODO : string ou Date ou Timestamp ?
    private _start_timestamp : string;
    private _end_timestamp : string;
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    private _isValue : boolean;

    constructor(id: number, patient: Patient, doctor: Doctor, pharmacy: Pharmacy, medicine: string, disease: string, start_timestamp: string, end_timestamp: string, isValue: boolean) {
        this._id = id;
        this._patient = patient;
        this._doctor = doctor;
        this._pharmacy = pharmacy;
        this._medicine = medicine;
        this._disease = disease;
        this._start_timestamp = start_timestamp;
        this._end_timestamp = end_timestamp;
        this._isValue = isValue;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get patient(): Patient {
        return this._patient;
    }

    set patient(value: Patient) {
        this._patient = value;
    }

    get doctor(): Doctor {
        return this._doctor;
    }

    set doctor(value: Doctor) {
        this._doctor = value;
    }

    get pharmacy(): Pharmacy {
        return this._pharmacy;
    }

    set pharmacy(value: Pharmacy) {
        this._pharmacy = value;
    }

    get medicine(): string {
        return this._medicine;
    }

    set medicine(value: string) {
        this._medicine = value;
    }

    get disease(): string {
        return this._disease;
    }

    set disease(value: string) {
        this._disease = value;
    }

    get start_timestamp(): string {
        return this._start_timestamp;
    }

    set start_timestamp(value: string) {
        this._start_timestamp = value;
    }

    get end_timestamp(): string {
        return this._end_timestamp;
    }

    set end_timestamp(value: string) {
        this._end_timestamp = value;
    }

    get isValue(): boolean {
        return this._isValue;
    }

    set isValue(value: boolean) {
        this._isValue = value;
    }
}
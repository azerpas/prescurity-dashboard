import {Patient} from "./Patient";
import {Doctor} from "./Doctor";
import {Pharmacy} from "./Pharmacy";

export class Prescription {
    private _id: number;
    private _patient: Patient;
    private _doctor: Doctor;
    private _pharmacy: Pharmacy;
    private _medicine: string;
    private _disease: string;
    private _frequency: string;
    // TODO : string ou Date ou Timestamp ?
    private _start_timestamp: string;
    private _end_timestamp: string;
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    private _claimed: boolean;
    private _paid: boolean;

    constructor(id: number, patient: Patient, doctor: Doctor, disease: string, medicine: string, frequency: string, start_timestamp: string, end_timestamp: string, claimed: boolean, paid: boolean, pharmacy?: Pharmacy) {
        this._id = id;
        this._patient = patient;
        this._doctor = doctor;
        this._pharmacy = pharmacy;
        this._medicine = medicine;
        this._disease = disease;
        this._frequency = frequency;
        this._start_timestamp = start_timestamp;
        this._end_timestamp = end_timestamp;
        this._claimed = claimed;
        this._paid = paid;
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

    get frequency(): string {
        return this._frequency;
    }

    set frequency(value: string) {
        this._frequency = value;
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

    get claimed(): boolean {
        return this._claimed;
    }

    set claimed(value: boolean) {
        this._claimed = value;
    }

    get paid(): boolean {
        return this._paid;
    }

    set paid(value: boolean) {
        this._paid = value;
    }


    static makePrescriptionWithArray(array) {
        const start = "" + (array.startTimestamp * 1000);
        const end = "" + (array.endTimestamp * 1000);
        return new Prescription(array.id,
            new Patient(array.patient?.name, "", "", "", array.patient?.numero_secu, array.patient?.patientAddress),
            new Doctor(array.doctor?.name, "", "", "", array.doctor?.uid, array.doctor?.speciality, array.doctor?.doctorAddress),
            array.disease, array.medicine, array.frequency, start,end,  array.claimed, array.paid);
    }
}
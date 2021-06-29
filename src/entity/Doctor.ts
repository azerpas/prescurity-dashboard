import {User} from "./User";


export class Doctor extends User {
    private _speciality: string;


    constructor(name: string, accessToken: string, refreshToken: string, email: string, uid: string, speciality: string, address: string) {
        super(name, accessToken, refreshToken, email, uid, address);
        this._speciality = speciality;
    }

    get speciality(): string {
        return this._speciality;
    }

    set speciality(value: string) {
        this._speciality = value;
    }
}
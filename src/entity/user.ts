export class User{
    private _name:string;
    private _refreshToken:string;
    private _email:string;
    private _uid:string;

    constructor(name: string, refreshToken: string, email: string, uid: string) {
        this._name = name;
        this._refreshToken = refreshToken;
        this._email = email;
        this._uid = uid;
    }


    get uid(): string {
        return this._uid;
    }

    set uid(value: string) {
        this._uid = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }
}
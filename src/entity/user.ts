export class User{
    private _name:String;
    private _refreshToken:String;
    private _email:String;
    private _uid:String;

    constructor(name: String, refreshToken: String, email: String, uid: String) {
        this._name = name;
        this._refreshToken = refreshToken;
        this._email = email;
        this._uid = uid;
    }


    get uid(): String {
        return this._uid;
    }

    set uid(value: String) {
        this._uid = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get refreshToken(): String {
        return this._refreshToken;
    }

    set refreshToken(value: String) {
        this._refreshToken = value;
    }

    get email(): String {
        return this._email;
    }

    set email(value: String) {
        this._email = value;
    }
}
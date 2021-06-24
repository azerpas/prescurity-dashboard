export class User{
    private _name:String;
    private _token:String;
    private _refreshToken:String;
    private _email:String;

    constructor(name: String, token?: String, refreshToken?: String, email?: String) {
        this._name = name;
        this._token = token;
        this._refreshToken = refreshToken;
        this._email = email;
    }
    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get token(): String {
        return this._token;
    }

    set token(value: String) {
        this._token = value;
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
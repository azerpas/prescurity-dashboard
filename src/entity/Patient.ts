import {User} from "./User";

export class Patient extends User{

    constructor(name: string, accessToken: string, refreshToken: string, email: string, uid: string) {
        super(name, accessToken, refreshToken, email, uid);
    }
}
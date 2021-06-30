import {User} from "./User";

export class Owner extends User {
    constructor(name: string, accessToken: string, refreshToken: string, email: string, uid: string, address: string) {
        super(name, accessToken, refreshToken, email, uid, address);
    }
}
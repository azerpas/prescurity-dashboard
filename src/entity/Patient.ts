import {User} from "./User";

export class Patient extends User {

    /**
     *
     * @param name: String
     * @param accessToken: String
     * @param refreshToken: String
     * @param email: String
     * @param uid: String
     * @param address
     */
    constructor(name: string, accessToken: string, refreshToken: string, email: string, uid: string, address: string) {
        super(name, accessToken, refreshToken, email, uid, address);
    }
}
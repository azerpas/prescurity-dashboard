import admin from "../../utils/admin";
import {NextApiRequest, NextApiResponse} from "next";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.email) {
        res.status(401).json({
            message: "No email sent",
            name: "error"
        })
    } else {
        try {
            const user = await admin.auth().getUserByEmail(req.body.email);
            res.json({userExist: true});
        } catch (e) {
            console.error(e);
            res.json({userExist: false});
        }
    }
}
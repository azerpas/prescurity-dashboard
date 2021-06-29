import admin from "../../utils/admin";
import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.email) {
        res.status(401).json({
            message: "No email sent",
            name: "error"
        })
    } else {
        try {
            const newUser = await admin.auth().createUser({
                email: ""+req.body.email,
                displayName :""+req.body.address
            });
            res.json({userExist: false,user:newUser});
        } catch (e) {
            console.log(e);
            res.json({userExist: true});
        }
    }
}
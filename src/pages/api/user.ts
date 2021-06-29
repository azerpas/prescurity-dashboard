import admin from "../../utils/admin";
import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!req.query.email) {
        res.status(401).json({
            message: "No email sent",
            name: "error"
        })
    } else {
        try {
            const user = await admin.auth().getUserByEmail("" + req.query.email);
            const userExist = !!user.uid;
            res.json({userExist: userExist});
        }catch (e){
            res.json({userExist: false});
        }
    }
}
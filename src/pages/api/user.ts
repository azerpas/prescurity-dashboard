import admin from "../../utils/admin";
import {NextApiRequest, NextApiResponse} from "next";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET"){
        if (!req.query.email) {
            res.status(401).json({
                message: "No email sent",
                name: "error"
            })
        } else {
            try {
                const user = await admin.auth().getUserByEmail(""+req.query.email);
                res.json({userExist: true});
            } catch (e) {
                console.error(e);
                res.json({userExist: false});
            }
        }
    }else if(req.method == "POST"){
        if (!req.body.email) {
            res.status(401).json({
                message: "No email sent",
                name: "error"
            })
        } else {
            try {
                const newUser = await admin.auth().createUser({
                    email: "" + req.body.email,
                    displayName: "" + req.body.address
                });
                res.json({userExist: false});
            } catch (e) {
                console.error(e);
                res.json({userExist: true});
            }
        }
    }else{
        res.status(400).json({
            message: "METHOD unhautorized",
            name: "error"
        })
    }

}
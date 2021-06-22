
import admin from "../../utils/admin";


export default async function handler(req, res) {
    const query = req.query;
    const user = await admin.auth().getUser("fYEHnHSzc3UHm22Lo6zKbfzRLs12");
    res.end(user.email);
}
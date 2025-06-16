import { decodeJwt } from "../utils/jwt.js";
export default function (req, res, next) {
    const authToken = req.cookies.authentication;
    if (!authToken) {
        res.status(401).send("no auth token included with request");
        return;
    }
    const result = decodeJwt(authToken);
    if (!result.valid) {
        res.status(401).send(result.reason);
        return;
    }
    req.user = authToken;
    next();
}

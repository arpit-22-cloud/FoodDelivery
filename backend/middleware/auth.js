import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Destructure token from request headers 
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" }); 
    }

    try {
        // Verify token against the secret key stored in .env 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Extract user ID and attach to request body for controller use 
        req.body.userId = token_decode.id;
        next(); // Proceed to the actual controller 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); 
    }
}

export default authMiddleware;
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Assuming the JWT token is stored in a cookie named 'jwt'

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token",
            });
        }

        // Find the user associated with the token
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        return res.status(500).json({
            message: "Internal server error occurred",
        });
    }
};

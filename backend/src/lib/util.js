import jwt from "jsonwebtoken"

export const generateToken=( userId, res)=>{

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d",
    });

    // send cookie to user
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly : true, // only on9 avail not in js
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development", 
    });

    return token;
};
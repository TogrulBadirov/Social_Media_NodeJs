import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        // Extract the token without the 'Bearer ' prefix
        const tokenWithoutBearer = token.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Attach the user object to the request
        req.user = decoded;

        next(); // Continue to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

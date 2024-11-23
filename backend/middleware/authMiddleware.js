// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from the authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'your-secret-key');  // Replace 'your-secret-key' with your actual secret key

    // Add the user information to the request object
    req.user = decoded.user;

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

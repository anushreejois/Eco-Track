const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ Step 1: Check header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }

  // ✅ Step 2: Extract token
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Step 3: Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Step 4: Attach userId to request object
    req.userId = decoded.userId;

    // ✅ Step 5: Continue
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;


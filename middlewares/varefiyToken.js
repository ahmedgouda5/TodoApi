import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"] || req.headers["Authorization"];

  console.log(authHeaders);
  
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;

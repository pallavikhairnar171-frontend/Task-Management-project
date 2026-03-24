import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1] ||  req.cookies
  console.log(token,"------11---");
  
//   const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: true, message: "Not Authorized. Login Again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken.id) {
      // req.body.userId = decodedToken.id
      if (!req.body) req.body = {};
      console.log(req.body);
      req.body.userId = decodedToken.id;
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
    next();
  } catch (err) {
    return res.json({ success: true, message: err.message });
  }
};

export default userAuth;

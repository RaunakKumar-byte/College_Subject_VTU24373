import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // attach user data to request

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
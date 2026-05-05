import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      ...decoded,
      role: decoded.role || "user",
    };

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).render("dashboard", {
      user: req.user,
      events: [],
      myBookings: [],
      allBookings: [],
      onlineUsers: 0,
      message: "Access denied.",
    });
  }
  return next();
};

export const protectSocketUser = (cookieHeader) => {
  const tokenPair = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("token="));

  if (!tokenPair) {
    throw new Error("Token missing");
  }

  const token = decodeURIComponent(tokenPair.split("=")[1]);
  const decoded = jwt.verify(token, JWT_SECRET);
  return { ...decoded, role: decoded.role || "user" };
};
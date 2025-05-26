import { config } from "../config.js";

export const getAdminInfo = (req, res) => {
  if (req.user && req.user.userType === "admin") {
    const { email} = config.emailAdmin;
    return res.json({ email });
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

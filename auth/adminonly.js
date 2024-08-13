const { User } = require("../model/usermodel");
const jwt = require("jsonwebtoken");
async function adminonly(req, res, next) {
    const token=req.header('Authorization')?.replace('Bearer ','');
  if (!token) {
    return res.this.status(401).json({ error: "token is been required" });
  }
  try {
    const decode = jwt.verify(token, "es2323");
    if (!decode || !decode.userID) {
      throw Error("Invalid user id ");
    }
    const admin=await User.findOne({ _id: decode.userID });
    if (!admin) {
      return res.status(401)({ error: "user is been not there" });
    }
    if (admin.role === "admin") {
      req.admin=admin;
      next();
    } else {
      return res
        .status(500)
        .json({ error: "the admin valid to access" });
    }
  } catch (err) {
    console.log("jwt verifcation error", err);
    res.status(401).json({ error: "invalid token" });
  }
}
module.exports = adminonly;
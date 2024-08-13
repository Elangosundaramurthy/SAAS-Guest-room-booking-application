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
    const owner=await User.findOne({ _id: decode.userID });
    if (!owner) {
      return res.status(401)({ error: "user is been not there" });
    }
    if (owner.role === "houseowner") {
     // req.admin=houseowner;
      next();
    } else {
      return res
        .status(500)
        .json({ error: "the houseowner valid to access" });
    }
  } catch (err) {
    console.log("jwt verifcation error", err);
    res.status(401).json({ error: "invalid token" });
  }
}
module.exports = adminonly;
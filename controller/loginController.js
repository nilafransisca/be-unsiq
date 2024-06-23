import { query } from "../Database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Endpoint
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await query("INSERT INTO user (nama, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
    return res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Server error occurred" });
  }
};

// Login Endpoint
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const [results] = await query("SELECT * FROM user WHERE email = ?", [email]);
    if (results.length === 0) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const user = results[0]; // Mengambil user pertama dari hasil query

    if (!user || !user.password) {
      return res.status(500).json({ msg: "Server error occurred" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id_user, username: user.nama }, "your_jwt_secret_key", { expiresIn: "1h" });
    const bearerToken = `Bearer ${token}`;
    return res.status(200).json({ msg: "Login successful", token: bearerToken });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Server error occurred" });
  }
};

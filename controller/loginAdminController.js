import { query } from "../Database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login Endpoint
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Email:', email);
    console.log('Password:', password);

    // Eksekusi query ke database
    const [results] = await query("SELECT Id_Admin as id_admin, Nama as nama, Email as email, Kata_Sandi as password FROM Admin WHERE Email = ?", [email]);
    
    console.log('Query Results:', results);

    if (!results || results.length === 0) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const admin = results[0]; // Mengambil admin pertama dari hasil query
    
    // Tambahkan log untuk memeriksa data admin
    console.log('Admin:', admin);

    if (!admin || !admin.password) {
      return res.status(500).json({ msg: "Server error occurred" });
    }

    // Bandingkan password yang diinput dengan password yang di-hash di database
    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log('Password is valid:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
 
    const token = jwt.sign({ id: admin.id_admin, username: admin.nama }, "your_jwt_secret_key", { expiresIn: "1h" });
    const bearerToken = `Bearer ${token}`;
    console.log('Generated Token:', bearerToken);

    return res.status(200).json({ msg: "Login successful", token: bearerToken });
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Server error occurred" });
  }
};

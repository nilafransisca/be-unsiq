import { query } from "../Database/db.js";

export const buktipembayaranController = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const foto = file.filename; // assuming you want to store the filename in the database

  try {
    const connection = await query.getConnection();

    try {
      const sqlQuery = `
        INSERT INTO buktipembayaran (foto) 
        VALUES (?)
      `;

      const [result] = await connection.query(sqlQuery, [foto]);
      res.status(201).json({ msg: "Foto bukti pembayaran berhasil disimpan" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error saving payment proof photo:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export default buktipembayaranController;

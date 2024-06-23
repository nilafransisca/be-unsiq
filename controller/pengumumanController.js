import { query, connection } from '../Database/db.js';

// Mendapatkan semua pengumuman
export const getPengumuman = async (req, res) => {
  try {
    const connection = await connection();
    const [rows] = await connection.query('SELECT * FROM pengumuman');
    connection.release();
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Mendapatkan satu pengumuman berdasarkan ID
export const getPengumumanById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await query.getConnection();
    const [rows] = await connection.query('SELECT * FROM pengumuman WHERE id_pengumuman = ?', [id]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ msg: `Pengumuman dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching announcement by ID:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Menambahkan pengumuman baru
export const insertPengumuman = async (req, res) => {
  const { deskripsi, tanggal } = req.body;
  try {
    const connection = await query.getConnection();
    await connection.query('INSERT INTO pengumuman (deskripsi, tanggal) VALUES (?, ?)', [deskripsi, tanggal]);
    connection.release();
    res.status(201).json({ msg: 'Pengumuman Ditambahkan' });
  } catch (error) {
    console.error('Error adding announcement:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Mengupdate pengumuman berdasarkan ID
export const updatePengumuman = async (req, res) => {
  const { id } = req.params;
  const { deskripsi, tanggal } = req.body;
  try {
    const connection = await query.getConnection();
    const [result] = await connection.query('UPDATE pengumuman SET deskripsi = ?, tanggal = ? WHERE id_pengumuman = ?', [deskripsi, tanggal, id]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: `Pengumuman dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ msg: 'Pengumuman Diubah' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Menghapus pengumuman berdasarkan ID
export const deletePengumuman = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await query.getConnection();
    const [result] = await connection.query('DELETE FROM pengumuman WHERE id_pengumuman = ?', [id]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: `Pengumuman dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ msg: 'Pengumuman Dihapus' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

import { connection } from '../Database/db.js';

// Menyimpan foto ke dalam galeri
export const simpanFoto = async (req, res) => {
  const { foto } = req.body;

  try {
    const conn = await connection();

    // Query untuk menyimpan data foto ke dalam tabel galeri
    const query = `
      INSERT INTO galeri (foto) 
      VALUES (?)
    `;

    // Eksekusi query dengan menggunakan data dari request body
    const [result] = await conn.query(query, [foto]);

    conn.release();

    // Mengembalikan respons jika penyimpanan berhasil
    res.status(201).json({ msg: 'Foto berhasil disimpan' });
  } catch (error) {
    console.error('Error saving photo:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Mengambil semua foto dari galeri
export const getAllPhotos = async (req, res) => {
  try {
    const conn = await connection();

    // Query untuk mengambil semua data foto dari tabel galeri
    const query = `
      SELECT * FROM galeri
    `;

    // Eksekusi query
    const [rows] = await conn.query(query);

    conn.release();

    // Mengembalikan data foto dalam respons
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Mengambil foto berdasarkan ID
export const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await connection();

    // Query untuk mengambil data foto berdasarkan ID
    const query = `
      SELECT * FROM galeri WHERE id_galeri = ?
    `;

    // Eksekusi query dengan menggunakan ID dari parameter
    const [rows] = await conn.query(query, [id]);

    conn.release();

    // Memeriksa apakah data foto ditemukan atau tidak
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Foto tidak ditemukan' });
    }

    // Mengembalikan data foto dalam respons
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching photo by ID:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

// Menghapus foto berdasarkan ID
export const deletePhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await connection();

    // Query untuk menghapus data foto berdasarkan ID
    const query = `
      DELETE FROM galeri WHERE id_galeri = ?
    `;

    // Eksekusi query dengan menggunakan ID dari parameter
    await conn.query(query, [id]);

    conn.release();

    // Mengembalikan respons jika penghapusan berhasil
    res.status(200).json({ msg: 'Foto berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting photo by ID:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

const galeriController = {
  simpanFoto,
  getAllPhotos,
  getPhotoById,
  deletePhotoById
};
export default galeriController;
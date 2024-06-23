import { query } from '../Database/db.js';

// Menyimpan cerita alumni ke dalam database
export const simpanCeritaAlumni = async (req, res) => {
  const { foto, nama_alumni, tahun_lulus, deskripsi } = req.body;

  try {
    const connection = await query.getConnection();

    // Query untuk menyimpan data cerita alumni ke dalam tabel
    const query = `
      INSERT INTO cerita_alumni (foto, nama_alumni, tahun_lulus, deskripsi) 
      VALUES (?, ?, ?, ?)
    `;

    // Eksekusi query dengan menggunakan data dari request body
    const [result] = await connection.query(query, [foto, nama_alumni, tahun_lulus, deskripsi]);

    connection.release();

    // Mengembalikan respons jika penyimpanan berhasil
    res.status(201).json({ msg: 'Cerita alumni berhasil disimpan' });
  } catch (error) {
    console.error('Error saving alumni story:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};

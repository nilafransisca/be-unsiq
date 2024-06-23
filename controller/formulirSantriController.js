import { query } from "../Database/db.js";

export const daftarSantri = async (req, res) => {
  const { is_admin, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, nik, nisn, nim, prodi, tahun_masuk_pondok, nama_ayah, nama_ibu, alamat_ortu, no_telepon_ortu, kategori } = req.body;

  const pas_foto = req.files["pas_foto"][0].filename;
  const surat_pernyataan = req.files["surat_pernyataan"][0].filename;

  try {
    const connection = await query.getConnection();

    try {
      const sql = `
        INSERT INTO santri (
          is_admin, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, nik, nisn, nim, prodi, 
          tahun_masuk_pondok, nama_ayah, nama_ibu, alamat_ortu, no_telepon_ortu, pas_foto, 
          surat_pernyataan, kategori
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.query(sql, [
        is_admin,
        nama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        nik,
        nisn,
        nim,
        prodi,
        tahun_masuk_pondok,
        nama_ayah,
        nama_ibu,
        alamat_ortu,
        no_telepon_ortu,
        pas_foto,
        surat_pernyataan,
        kategori,
      ]);

      res.status(201).json({ msg: "Data santri berhasil disimpan" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error saving santri data:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

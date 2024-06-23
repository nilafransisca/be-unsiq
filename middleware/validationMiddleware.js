const validateForm = (req, res, next) => {
  const {
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
    kategori
  } = req.body;

  // Simple validation
  if (!nama || !jenis_kelamin || !tempat_lahir || !tanggal_lahir || !nik) {
    return res.status(400).json({ msg: 'Harap lengkapi semua field yang diperlukan.' });
  }

  next();
};

export { validateForm };

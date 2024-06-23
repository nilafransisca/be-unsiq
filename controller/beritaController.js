import { query } from '../Database/db.js';

// GET all news articles
export const getBerita = async (req, res) => {
    try {
        const result = await query('SELECT * FROM berita');
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching news:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// POST a new news article
export const insertBerita = async (req, res) => {
    const { foto, judul_berita, tanggal, deskripsi } = req.body;
    try {
        await query('INSERT INTO berita (foto, judul_berita, tanggal, deskripsi) VALUES (?, ?, ?, ?)', [
            foto,
            judul_berita,
            tanggal,
            deskripsi,
        ]);
        return res.status(200).json({ msg: 'Berita added' });
    } catch (error) {
        console.error('Error adding berita:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// PUT (Update) a news article
export const updateBerita = async (req, res) => {
    const { id } = req.params;
    const { foto, judul_berita, tanggal, deskripsi } = req.body;
    try {
        await query('UPDATE berita SET foto=?, judul_berita=?, tanggal=?, deskripsi=? WHERE id_berita=?', [
            foto,
            judul_berita,
            tanggal,
            deskripsi,
            id,
        ]);
        return res.status(200).json({ msg: 'Berita updated' });
    } catch (error) {
        console.error('Error updating berita:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// DELETE a news article
export const deleteBerita = async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM berita WHERE id_berita=?', [id]);
        return res.status(200).json({ msg: 'Berita deleted' });
    } catch (error) {
        console.error('Error deleting berita:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// GET a news article by ID
export const getBeritaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('SELECT * FROM berita WHERE id_berita=?', [id]);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching berita:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

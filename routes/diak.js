import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// Összes diak lekerdezese
router.get('/', async (req, res) =>{
    try {
        const [result] = await db.query(`SELECT * FROM diak`);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// diak feltoltese
router.post('/', async (req, res) => {
    try {
        const {nev, evfolyam, kor} = req.body;
        const [result] = await db.query(`INSERT INTO diak (nev, evfolyam, kor) VALUES (?,?,?)`), [nev, evfolyam, kor];
        res.json("Sikeres feltoltes");
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// diak torlese
router.delete('/:id', async (req, res)  => {
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM diak WHERE id = ?`, [id]);
        res.json("Sikeres torles!")
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})



export default router;
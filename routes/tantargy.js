import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// Összes diak lekerdezese
router.get('/', (req, res) =>{
    try {
        const [result] = await db.query(`SELECT * FROM tantargy`);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// tantargy feltoltese
router.post('/', async (req, res) => {
    try {
        const {nev, oktato} = req.body;
        const [result] = await db.query(`INSERT INTO tantargy (nev, oktato) VALUES (?,?,?)`), [nev, oktato];
        res.json("Sikeres feltoltes");
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// tantargy torlese
router.delete('/:id', async (req, res)  => {
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM tantargy WHERE id = ?`, [id]);
        res.json("Sikeres torles!")
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

export default router;
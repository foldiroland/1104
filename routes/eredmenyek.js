import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// Egy adott diak osszes eredmenyei
router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`SELECT * FROM eredmenyek WHERE diak_id = ?`, [id]);
    } catch (error) {
         console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// egy adott diak atlaga
router.get('/atlag/:diak_id/:tantargy_id', async (req, res)=>{
    try {
        const {diak_id, tantargy_id} = req.params;
        const [result] = await db.query(`SELECT AVG(eredmeny) FROM eredmenyek WHERE diak_id = ? AND tantargy_id = ?`, [diak_id, tantargy_id]);
    } catch (error) {
         console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// eredmeny feltoltese
router.post('/', async (req, res) => {
    try {
        const {tantargy_id, diak_id, eredmeny} = req.body;
        const [result] = await db.query(`INSERT INTO eredmenyek (tantargy_id, diak_id, eredmeny) VALUES (?,?,?)`), [tantargy_id, diak_id, eredmeny];
        res.json("Sikeres feltoltes");
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// egy tantargy atlaga
router.get('/atlag/:tantargy_id', async (req, res)=>{
    try {
        const {tantargy_id} = req.params;
        const [result] = await db.query(`SELECT AVG(eredmeny) FROM eredmenyek WHERE tantargy_id = ?`, [tantargy_id]);
    } catch (error) {
         console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// egy adott evfolyam atlaga
router.get('/atlag/evfolyam', async (req, res)=>{
    try {
        const {evfolyam} = req.params;
        const [result] = await db.query(`SELECT AVG(eredmeny) FROM eredmenyek INNER JOIN diak ON diak_id = diak.id WHERE diak.evfolyam = ? `, [evfolyam]);
    } catch (error) {
         console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// eredmeny torlese
router.delete('/:id', async (req, res)  => {
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM eredmenyek WHERE id = ?`, [id]);
        res.json("Sikeres torles!")
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})


export default router;
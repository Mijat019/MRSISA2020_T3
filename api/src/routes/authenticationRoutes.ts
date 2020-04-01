import express from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const router = express.Router();

router.post('/login', async (req,res) => {
    res.send('uspeh');
})


router.post('/register', async (req,res) => {
    res.send('uspeh');
})

export default router;

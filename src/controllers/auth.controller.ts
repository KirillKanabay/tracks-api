import { Router } from "express";

const router = Router();

router.post('/signup', async (req, res) => {
    res.status(200).send('Signup');
});

router.post('/login', async (req, res) => {
    res.status(200).send('Login');
});

router.post('/refresh', async (req, res) => {
    res.status(200).send('Refresh');
});

export const authRouter = router;
import { Request, Router } from "express";
import { ErrorModel } from "../models/error.model";
import { AuthService } from "../services/auth.service";
import { responseWithFailedExecutionResult } from "../utils/response.utils";
import {
    LoginDto,
    validate as validateLoginDto
} from "../dtos/auth/login.dto";
import {
    SignupDto,
    validate as validateSignupDto
} from "../dtos/auth/signup.dto";

const router = Router();
const authService = new AuthService();

router.post('/signup', async (req: Request<{}, {}, SignupDto>, res) => {
    const dto = req.body;
    const errors = validateSignupDto(dto);

    if(errors.length) {
        res.status(400).send(ErrorModel.fromValidationErrors(errors));
        return;
    }

    const result = await authService.signup(dto.login, dto.password);

    if (!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(201).send({ message: 'User created' });
});

router.post('/login', async (req: Request<{}, {}, LoginDto>, res) => {
    const dto = req.body;
    const errors = validateLoginDto(dto);

    if(errors.length) {
        res.status(400).send(ErrorModel.fromValidationErrors(errors));
        return;
    }

    const result = await authService.login(dto.login, dto.password);
    if (!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.post('/refresh', async (req, res) => {
    res.status(200).send('Refresh');
});

export const authRouter = router;
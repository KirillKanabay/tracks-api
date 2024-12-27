import { Router } from "express";
import { ErrorModel } from "../../common/models/error.model";
import { AuthService } from "../services/auth.service";
import { responseWithFailedExecutionResult } from "../../common/utils/response.utils";
import {
    LoginDto,
    validate as validateLoginDto
} from "../dtos/login.dto";
import {
    SignupDto,
    validate as validateSignupDto
} from "../dtos/signup.dto";
import {
    RefreshTokenDto,
    validate as validateRefreshTokenDto
} from "../dtos/refresh-token.dto";
import {authMiddleware} from "../../common/middlewares/auth.middleware";
import {BodiedRequest} from "../../common/types/request.type";

const router = Router();
const authService = new AuthService();

router.post('/signup', async (req: BodiedRequest<SignupDto>, res) => {
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

router.post('/login', async (req: BodiedRequest<LoginDto>, res) => {
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

router.post('/refresh', authMiddleware(true), async (req: BodiedRequest<RefreshTokenDto>, res) => {
    const dto = req.body;
    const errors = validateRefreshTokenDto(dto);

    if(errors.length){
        res.status(401).send(ErrorModel.fromValidationErrors(errors));
        return;
    }

    const result = await authService.refresh(req.user?.userId!, dto.refreshToken);
    if (!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

export const authRouter = router;
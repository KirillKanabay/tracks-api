import {Router} from "express";
import {UserService} from "./user.service";
import {responseWithFailedExecutionResult} from "../common/utils/response.utils";
import {validate as isUUID} from 'uuid';
import {ErrorModel} from "../common/models/error.model";
import {AuthService} from "../auth/auth.service";
import {BodiedRequest} from "../common/types/request.type";
import {CreateUserDto, validate as validateCreateUserDto} from "./dtos/createUser.dto";
import {UpdatePasswordDto, validate as validateUpdatePasswordDto} from "./dtos/updatePassword.dto";

const router = Router();
const userService = new UserService();
const authService = new AuthService();

router.get('/', async (req, res) => {
    const result = await userService.getAll();
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    if(!isUUID(userId)){
        res.status(400).send(ErrorModel.fromValidationErrors([{field: 'id', message: 'Invalid UUID'}]));
    }

    const result = await userService.getById(req.params.id);
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.post('/', async (req: BodiedRequest<CreateUserDto>, res) => {
    const dto = req.body;
    const validationErrors = validateCreateUserDto(dto);

    if (validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await authService.signup(dto.login, dto.password);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(201).send({message: 'User created'});
});

router.put('/:id', async (req: BodiedRequest<UpdatePasswordDto, { id:string }>, res) => {
    const userId = req.params.id;
    if(!isUUID(userId)){
        res.status(400).send(ErrorModel.fromValidationErrors([{field: 'id', message: 'Invalid UUID'}]));
    }

    const dto = req.body;
    const validationErrors = validateUpdatePasswordDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await userService.updatePassword(userId, dto.oldPassword, dto.newPassword);

    if (!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send({message: 'Password updated'});
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    if(!isUUID(userId)){
        res.status(400).send(ErrorModel.fromValidationErrors([{field: 'id', message: 'Invalid UUID'}]));
    }

    const result = await userService.delete(req.params.id);
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(204).send();
});

export const userRouter = router;
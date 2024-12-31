import {Router} from "express";
import {ArtistService} from "./artist.service";
import {responseWithFailedExecutionResult} from "../common/utils/response.utils";
import {SaveArtistDto, validate as validateSaveArtistDto } from "./dtos/saveArtistDto";
import {BodiedRequest} from "../common/types/request.type";
import {ErrorModel} from "../common/models/error.model";
import {validate as isUUID} from "uuid";

const router = Router();
const artistService = new ArtistService();

router.get('/', async (req, res) => {
    const result = await artistService.getAll();

    if(!result.success) {
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if(!isUUID(id)){
        res.status(400).send(ErrorModel.fromValidationErrors([{field: 'id', message: 'Invalid UUID'}]));
    }

    const result = await artistService.getById(id);
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.post('/', async (req: BodiedRequest<SaveArtistDto>, res) => {
    const dto = req.body;
    const validationErrors = validateSaveArtistDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await artistService.create(dto);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(201).send({message: 'Artist created'});
});

router.put('/:id', async (req: BodiedRequest<SaveArtistDto, {id: string}>, res) => {
    const id = req.params.id;

    if(!isUUID(id)){
        res.status(400).send(ErrorModel.invalidUUID());
    }
    const dto = req.body;
    const validationErrors = validateSaveArtistDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await artistService.update(id, dto);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if(!isUUID(id)){
        res.status(400).send(ErrorModel.invalidUUID());
    }

    const result = await artistService.delete(id);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(204).send();
});

export const artistRouter = router;
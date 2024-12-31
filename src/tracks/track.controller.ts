import {Router} from "express";
import {responseWithFailedExecutionResult} from "../common/utils/response.utils";
import {validate as isUUID} from "uuid";
import {ErrorModel} from "../common/models/error.model";
import {TrackService} from "./track.service";
import {BodiedRequest} from "../common/types/request.type";
import {SaveTrackDto, validate as validateSaveTrackDto} from "./dtos/save-track.dto";

const router = Router();
const trackService = new TrackService();

router.get('/', async (req, res) => {
    const result = await trackService.getAll();

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

    const result = await trackService.getById(id);
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.post('/', async (req: BodiedRequest<SaveTrackDto>, res) => {
    const dto = req.body;
    const validationErrors = validateSaveTrackDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await trackService.create(dto);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(201).send({message: 'track created'});
});

router.put('/:id', async (req: BodiedRequest<SaveTrackDto, {id: string}>, res) => {
    const id = req.params.id;

    if(!isUUID(id)){
        res.status(400).send(ErrorModel.invalidUUID());
    }
    const dto = req.body;
    const validationErrors = validateSaveTrackDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await trackService.update(id, dto);

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

    const result = await trackService.delete(id);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(204).send();
});

export const trackRouter = router;


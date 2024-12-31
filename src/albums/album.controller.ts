import {Router} from "express";
import {AlbumService} from "./album.service";
import {responseWithFailedExecutionResult} from "../common/utils/response.utils";
import {validate as isUUID} from "uuid";
import {ErrorModel} from "../common/models/error.model";
import {BodiedRequest} from "../common/types/request.type";
import {SaveAlbumDto, validate as validateSaveAlbumDto} from "./dtos/save-album.dto";

const router = Router();
const albumService = new AlbumService();

router.get('/', async (req, res) => {
    const result = await albumService.getAll();

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

    const result = await albumService.getById(id);
    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(200).send(result.data);
});

router.post('/', async (req: BodiedRequest<SaveAlbumDto>, res) => {
    const dto = req.body;
    const validationErrors = validateSaveAlbumDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await albumService.create(dto);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(201).send({message: 'Album created'});
});

router.put('/:id', async (req: BodiedRequest<SaveAlbumDto, {id: string}>, res) => {
    const id = req.params.id;

    if(!isUUID(id)){
        res.status(400).send(ErrorModel.invalidUUID());
    }
    const dto = req.body;
    const validationErrors = validateSaveAlbumDto(dto);

    if(validationErrors.length){
        res.status(400).send(ErrorModel.fromValidationErrors(validationErrors));
        return;
    }

    const result = await albumService.update(id, dto);

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

    const result = await albumService.delete(id);

    if(!result.success){
        responseWithFailedExecutionResult(res, result);
        return;
    }

    res.status(204).send();
});

export const albumRouter = router;
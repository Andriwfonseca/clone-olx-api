import { Request, Response, Router } from 'express';
import * as AdController from '../controllers/AdController';
import * as AuthController from '../controllers/AuthController';
import * as UserController from '../controllers/UserController';
import { Auth } from '../middlewares/Auth';
import { AuthValidator } from '../validators/AuthValidator';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true});
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', Auth, UserController.getInfo);
router.put('/user/me', Auth, UserController.editAction);

router.get('/categories', AdController.getCategories);

router.post('/ad/add', Auth, AdController.addAction);
router.get('/ad/list', AdController.getList);
router.get('/ad/item', AdController.getItem);
router.post('ad/:id', Auth, AdController.editAction);

export default router;
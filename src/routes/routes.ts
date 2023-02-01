import { Request, Response, Router } from 'express';
import { AdController } from '../controllers/AdController';
import { AuthController } from '../controllers/AuthController';
import { UserController } from '../controllers/UserController';
import { Auth } from '../middlewares/Auth';
import { AuthValidator } from '../validators/AuthValidator';
import { UserValidator } from '../validators/UserValidator';


const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true});
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', Auth.private, UserController.getInfo);
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

router.get('/categories', AdController.getCategories);

router.post('/ad/add', Auth.private, AdController.addAction);
router.get('/ad/list', AdController.getList);
router.get('/ad/item', AdController.getItem);
router.put('ad/:id', Auth.private, AdController.editAction);

export default router;
import express, {Request, Response} from 'express';
import initController from '../controllers/initController';


const initRoute = express.Router();

initRoute.get('/', initController.installPrometheus, initController.installGrafana, (req: Request, res: Response) => {
   return res.sendStatus(200)
})

export default initRoute;
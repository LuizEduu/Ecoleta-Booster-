import express from 'express';

import PointsController from './controllers/PointsController';
import ItemController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemController = new ItemController();

const Routes = express.Router();

Routes.get('/items', itemController.index)

Routes.post('/points', pointsController.create);
Routes.get('/points/', pointsController.index);
Routes.get('/points/:id', pointsController.show);


export default Routes;
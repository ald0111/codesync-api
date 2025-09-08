import { Router } from 'express';
import { testEndpoint } from '../controllers/testController';
const testRouter = Router();
testRouter.get('/test', testEndpoint);
export default testRouter;

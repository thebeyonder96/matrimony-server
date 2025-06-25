import {Router} from 'express'
import AUTH_ROUTER from './auth.route';

const ROUTER = Router();

ROUTER.use('/auth',AUTH_ROUTER)

export default ROUTER;
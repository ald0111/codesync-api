import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddlesware';

const authRouter = Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
// Example of a protected route:
authRouter.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'Authenticated route' });
});

export default authRouter;

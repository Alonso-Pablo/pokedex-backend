import { Express } from 'express';
import Container from 'typedi';
import { PrivateRouteMiddleware } from '../../Auth/infraestructure/PrivateRouteMiddleware';
import { LoginUserController } from './LoginUserController';
import { RegisterUserController } from './RegisterUserController';
import { ReturnUserInfoController } from './ReturnUserInfoController';

export const register = (app: Express) => {
  const registerUserController = Container.get(RegisterUserController);
  const loginUserController = Container.get(LoginUserController);
  const returnUserInfoController = Container.get(ReturnUserInfoController);

  app.post('/auth/signup', registerUserController.run.bind(registerUserController));
  app.post('/auth/login', loginUserController.run.bind(loginUserController));
  app.get('/users/me',
    PrivateRouteMiddleware.authenticateToken,
    returnUserInfoController.run.bind(returnUserInfoController)
  );
};
import 'reflect-metadata';
import Container, { Token } from 'typedi';
import { UserRepository } from '../domain/UserRepository';
import { MongoUserRepository } from './MongoUserRepository';
import { BcryptPasswordHasher } from '../../Auth/infraestructure/BcryptPasswordHasher';
import { TokenStrategyGenerator } from '../../Auth/domain/TokenStrategyGenerator';
import { PasswordHasher } from '../../Auth/domain/PasswordHasher';
import { JwtGenerator } from '../../Auth/infraestructure/JwtGenerator';

export const USER_REPOSITORY_TOKEN = new Token<UserRepository>('mongo-user-repository');
Container.set(USER_REPOSITORY_TOKEN, Container.get<UserRepository>(MongoUserRepository));

export const TOKEN_STRATEGY_GENERATOR_TOKEN = new Token<TokenStrategyGenerator>('jwt-generator');
Container.set(TOKEN_STRATEGY_GENERATOR_TOKEN, Container.get<TokenStrategyGenerator>(JwtGenerator));

export const PASSWORD_HASHER_TOKEN = new Token<PasswordHasher>('bcrypt-password-hasher');
Container.set(PASSWORD_HASHER_TOKEN, Container.get<PasswordHasher>(BcryptPasswordHasher));

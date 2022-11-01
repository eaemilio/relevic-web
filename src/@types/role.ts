import { Module } from './module';

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[];
}

export interface RoleManager {
  id: number;
  name: string;
  description: string;
  permissions: Module[];
}

export enum Roles {
  ADMIN = 3,
  COORDINADOR = 1,
  AGENTE = 2,
}

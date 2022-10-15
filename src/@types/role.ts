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

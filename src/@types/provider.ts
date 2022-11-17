import { EvaluationArea } from './evaluation-area';
import { Province } from './province';
import { ServiceType } from './service-type';

export interface ServiceProvider {
  id: number;
  name: string;
  phoneNumber: string;
  description: string;
  email: string;
  address: string;

  provinceId: number;
  serviceTypeId: number;
  providerAreaId: number;

  networkInterest: number;
  networkNeeds: number[];

  // isActive: boolean; FIXME
}

export interface ServiceProviderBody {
  name: string;
  phoneNumber: string;
  description: string;
  email: string;
  address: string;

  provinceId: number;
  serviceTypeIds: number[];
  providerAreaIds: number[];

  networkInterest: number;
  networkNeeds: string;
}

export interface CurrentServiceProvider {
  id: number;
  name: string;
  phoneNumber: string;
  description: string;
  email: string;
  address: string;

  providerAreas: EvaluationArea[];
  province: Province;
  serviceTypes: ServiceType[];

  networkInterest: number;
  networkNeeds: string;

  branches: ProviderBranch[];
}

export const INTEREST_OPTIONS = [
  { label: 'Sí', value: 1 },
  { label: 'No', value: 2 },
  { label: 'Quiere Más Información', value: 3 },
  { label: 'No puede ahora pero quizá luego', value: 4 },
];

export const HELP_ITEMS = [
  { label: 'Mentoreo de IJM', value: 1 },
  { label: 'Herramienta tic', value: 2 },
  { label: 'Entrenamiento sobre ESO', value: 3 },
  { label: 'Convencimiento sobre participación en la red', value: 4 },
  { label: 'Paquete de gestión', value: 5 },
  { label: 'Canal de Comunicación con CONANI', value: 6 },
  { label: 'Capacitación sobre trauma', value: 7 },
  { label: 'Otro', value: 8 },
];

export interface ProviderBranch {
  name: string;
  email: string;
  address: string;
  personInCharge: string;
  phoneNumber: string;
  latitude: string;
  longitude: string;
  id: number;
}

export interface ProviderBranchBody {
  name: string;
  email: string;
  address: string;
  personInCharge: string;
  phoneNumber: string;
  latitude: string;
  longitude: string;
}

export const PROVIDER_BASE_URL = '/provider';
export const BRANCH_BASE_URL = '/branch';

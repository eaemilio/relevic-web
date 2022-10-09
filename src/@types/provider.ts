export interface ServiceProvider {
  id: number;
  name: string;
  phone: string;
  description: string;
  email: string;
  address: string;

  province: string;
  type: number;
  areaId: number;

  interest: number;
  items: number[];

  latitude: string;
  longitude: string;

  isActive: boolean;
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
  description: string;
  phone: number | string;
  id: number;
}
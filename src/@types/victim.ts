export interface Victim {
  name: string;
  otherName: string;
  age: number;
  verifiedAge: number;
  birthday: string;
  citizenship: string;
  ethnicity: string;
  nationality: string;
  maritalStatus: number;
  children: number;
  originAddress: string;
  currentAddress: string;
  phoneNumber: string;
  preferredLanguage: string;
  id: number;
}

export type VictimBody = Victim;

export const VICTIM_BASE_URL = '/victim';

export const MARITAL_STATUES = [
  { label: 'Soltera', value: 1 },
  { label: 'Comprometida', value: 2 },
  { label: 'Casada', value: 3 },
  { label: 'Separada', value: 4 },
  { label: 'Enviudada', value: 5 },
  { label: 'Vive con Pareja', value: 6 },
  { label: 'Divorciada', value: 7 },
];

export const YES_NO_OPTIONS = [
  { label: 'Sí', value: 1 },
  { label: 'No', value: 0 },
];

export const MOCK_VICTIM: Victim[] = [
  {
    name: 'Consuelo María Pérez Baez',
    otherName: 'Consu',
    age: 45,
    verifiedAge: 45,
    birthday: '10/10/1978',
    citizenship: 'Dominicana',
    ethnicity: 'Latina',
    nationality: 'Dominicana',
    children: 2,
    currentAddress: '51AVE B 2-90, Barrio la Merced',
    id: 12345678901,
    maritalStatus: 1,
    originAddress: '51AVE B 2-90, Barrio la Merced',
    phoneNumber: '871890292',
    preferredLanguage: 'Español',
  },
];

export const EMPTY_VICTIM: VictimBody = {
  name: '',
  otherName: '',
  age: 0,
  verifiedAge: 0,
  birthday: '',
  citizenship: '',
  ethnicity: '',
  nationality: '',
  children: 0,
  currentAddress: '',
  maritalStatus: 0,
  originAddress: '',
  phoneNumber: '',
  preferredLanguage: '',
  id: 0,
};

import { _userList } from 'src/_mock';
import { UserManager } from './user';

export interface DemographicForm {
  id: number;
  caseId: number;
  participation: string;
  commitment: number;
  comments: string;
  userInCharge: UserManager;
  completed: boolean;
  description: string;
  createdAt: string;
}

export interface DemographicFormBody {
  caseId: number;
  participation: string;
  commitment: number;
  comments: string;
  userInChargeId: number;
  completed: boolean;
  description: string;
}

export const EMPTY_DEMOGRAPHIC_FORM: DemographicFormBody = {
  caseId: 0,
  participation: '',
  commitment: 0,
  comments: '',
  userInChargeId: 0,
  completed: false,
  description: '',
};
export const COMMITMENT_TYPES = [
  { label: 'No', value: 0 },
  { label: 'Sí', value: 1 },
  { label: 'Inseguro', value: 2 },
];

export const DEMOGRAPHIC_FORM_BASE_URL = '/demographic-form';

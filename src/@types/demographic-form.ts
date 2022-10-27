export interface DemographicForm {
  id: number;
  caseId: number;
  participation: string;
  commitment: number;
  comments: string;
  description: string;
  userInChargeId: number;
  completed: boolean;
}

export type DemographicFormBody = Omit<DemographicForm, 'id'>;

export const EMPTY_DEMOGRAPHIC_FORM: DemographicFormBody = {
  caseId: 0,
  participation: '',
  commitment: 0,
  comments: '',
  description: '',
  userInChargeId: 0,
  completed: false,
};

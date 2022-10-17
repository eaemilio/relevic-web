export interface Module {
  id: number;
  name: string;
  description: string;
}

export enum ModuleType {
  USER = 1,
  PROVIDER = 2,
  SERVICE_TYPE = 3,
  ROLE = 4,
  PROVINCE = 5,
  EVALUATION_AREA = 6,
}

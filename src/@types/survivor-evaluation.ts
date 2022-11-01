import { CurrentUser, UserManager } from './user';

export interface SurvivorEvaluation {
  id: number;
  caseId: number;
  violenceType: number;
  provinceId?: number;
  // ! FIXME ask chino to remove this: providerId: number;
  place: string;
  phase: SurvivorEvaluationPhase;
  security1: number;
  security2: number;
  security3: number;
  securityNotes: string;
  legalProtection1: number;
  legalProtection2: number;
  legalProtection3: number;
  legalProtectionNotes: string;
  mentalWelfare1: number;
  mentalWelfare2: number;
  mentalWelfare3: number;
  mentalWelfare4: number;
  mentalWelfareNotes: string;
  financial1: number;
  financial2: number;
  financial3: number;
  financial4: number;
  financialNotes: string;
  social1: number;
  social2: number;
  social3: number;
  social4: number;
  socialNotes: string;
  physical1: number;
  physical2: number;
  physical3: number;
  physical4: number;
  physical5: number;
  physicalNotes: string;
  total: number;
  survivorStatus: number;
  createdAt: string;
  completedAt: string;
  userInCharge: CurrentUser;
  completed: boolean;
  securityTotal: number;
  legalProtectionTotal: number;
  mentalWelfareTotal: number;
  financial: number;
  social: number;
  physical: number;
}

export interface SurvivorEvaluationBody {
  caseId: number;
  violenceType: number;
  // providerId: number;
  provinceId?: number;
  place: string;
  phase: SurvivorEvaluationPhase;
  security1: number;
  security2: number;
  security3: number;
  securityNotes: string;
  legalProtection1: number;
  legalProtection2: number;
  legalProtection3: number;
  legalProtectionNotes: string;
  mentalWelfare1: number;
  mentalWelfare2: number;
  mentalWelfare3: number;
  mentalWelfare4: number;
  mentalWelfareNotes: string;
  financial1: number;
  financial2: number;
  financial3: number;
  financial4: number;
  financialNotes: string;
  social1: number;
  social2: number;
  social3: number;
  social4: number;
  socialNotes: string;
  physical1: number;
  physical2: number;
  physical3: number;
  physical4: number;
  physical5: number;
  physicalNotes: string;
  total: number;
  survivorStatus: number;
  createdAt: string;
  completedAt: string;
  userInChargeId: number;
  completed: boolean;
  securityTotal: number;
  legalProtectionTotal: number;
  mentalWelfareTotal: number;
  financial: number;
  social: number;
  physical: number;
}

export const EMPTY_SURVIVOR_EVALUATION = (
  phase: SurvivorEvaluationPhase
): SurvivorEvaluationBody => ({
  caseId: 0,
  violenceType: 0,
  place: '',
  phase,
  security1: 1,
  security2: 1,
  security3: 1,
  securityNotes: '',
  legalProtection1: 1,
  legalProtection2: 1,
  legalProtection3: 1,
  legalProtectionNotes: '',
  mentalWelfare1: 1,
  mentalWelfare2: 1,
  mentalWelfare3: 1,
  mentalWelfare4: 1,
  mentalWelfareNotes: '',
  financial1: 1,
  financial2: 1,
  financial3: 1,
  financial4: 1,
  financialNotes: '',
  social1: 1,
  social2: 1,
  social3: 1,
  social4: 1,
  socialNotes: '',
  physical1: 1,
  physical2: 1,
  physical3: 1,
  physical4: 1,
  physical5: 1,
  physicalNotes: '',
  total: 0,
  survivorStatus: 0,
  createdAt: '',
  completedAt: '',
  userInChargeId: 0,
  completed: false,
  provinceId: 1,
  securityTotal: 1,
  legalProtectionTotal: 1,
  mentalWelfareTotal: 1,
  financial: 1,
  social: 1,
  physical: 1,
});

export enum SurvivorEvaluationPhase {
  START,
  END,
  POST,
  OTHER,
}

export const SURVIVOR_EVALUATION_BASE_URL = '/survivor-evaluation';

export const VIOLENCE_TYPES = [
  { label: 'Explotación Sexual Comercial', value: 0 },
  { label: 'Abuso Sexual Infantil', value: 1 },
  { label: 'Explotación Laboral', value: 2 },
  { label: 'Violencia Entre Pareja', value: 3 },
  { label: 'Explotación Sexual en Línea', value: 4 },
  { label: 'Apropiación de Propiedad', value: 5 },
  { label: 'Abuso de Poder Policial', value: 6 },
];

export const FORM_OPTIONS = [
  { label: '1 - Muy Vulnerable', value: 1 },
  { label: '2 - Vulnerable', value: 2 },
  { label: '3 - Estable', value: 3 },
  { label: '4 - Muy Estable', value: 4 },
];

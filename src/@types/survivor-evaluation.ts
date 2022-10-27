export interface SurvivorEvaluation {
  id: number;
  caseId: number;
  violenceType: number;
  provinceId: number;
  providerId: number;
  place: string;
  phase: SurvivorEvaluationPhase;
  security: string;
  securityNotes: string;
  legalProtection: string;
  legalProtectionNotes: string;
  mentalWelfare: string;
  mentalWelfareNotes: string;
  financial: string;
  financialNotes: string;
  social: string;
  socialNotes: string;
  physical: string;
  physicalNotes: string;
  total: number;
  survivorStatus: number;
  createdAt: string;
  completedAt: string;
  userInChargeId: number;
  completed: boolean;
}

export type SurvivorEvaluationBody = Omit<SurvivorEvaluation, 'id'>;

export const EMPTY_SURVIVOR_EVALUATION = (
  phase: SurvivorEvaluationPhase
): SurvivorEvaluationBody => ({
  caseId: 0,
  violenceType: 0,
  provinceId: 0,
  providerId: 0,
  place: '',
  phase,
  security: '',
  securityNotes: '',
  legalProtection: '',
  legalProtectionNotes: '',
  mentalWelfare: '',
  mentalWelfareNotes: '',
  financial: '',
  financialNotes: '',
  social: '',
  socialNotes: '',
  physical: '',
  physicalNotes: '',
  total: 0,
  survivorStatus: 0,
  createdAt: '',
  completedAt: '',
  userInChargeId: 0,
  completed: false,
});

export enum SurvivorEvaluationPhase {
  START,
  END,
  POST,
  OTHER,
}

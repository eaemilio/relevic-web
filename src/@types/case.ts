import { AttentionProtocol, AttentionProtocolBody } from './attention-protocol';
import { DemographicForm, DemographicFormBody } from './demographic-form';
import { FollowUpNote } from './follow-up';
import { SurvivorEvaluation, SurvivorEvaluationBody } from './survivor-evaluation';
import { Victim, VictimBody } from './victim';

export interface Case {
  name: string;
  id: number;
  description: string;
}

export interface CurrentCase {
  id: number;
  description: string;
  victim: Victim;
  providerId: number;
  userInChargeId: number;
  consent: boolean;
  demographicForm: DemographicForm;
  initialSurvivorEvaluation: SurvivorEvaluation;
  finalSurvivorEvaluation: SurvivorEvaluation;
  postSurvivorEvaluation: SurvivorEvaluation;
  attentionProtocol: AttentionProtocol;
  followUpUserInCharge: number;
  followUpNotes: FollowUpNote[];
}

export interface CaseBody {
  name: string;
  description: string;
  providerId: number;
}

export interface NetworkCase {
  id: number;
  description: string;
  victim: Victim;
  providerId: number;
  userInChargeId: number;
  consent: boolean;
  demographicForm: DemographicForm;
  initialSurvivorEvaluation: SurvivorEvaluation;
  finalSurvivorEvaluation: SurvivorEvaluation;
  postSurvivorEvaluation: SurvivorEvaluation;
  attentionProtocol: AttentionProtocol;
  followUpUserInCharge: number;
}

export interface NetworkCaseBody {
  description: string;
  victim: VictimBody;
  providerId: number;
  userInChargeId: number;
  consent: boolean;
  demographicForm: DemographicFormBody;
  initialSurvivorEvaluation: SurvivorEvaluationBody;
  finalSurvivorEvaluation: SurvivorEvaluationBody;
  postSurvivorEvaluation: SurvivorEvaluationBody;
  attentionProtocol: AttentionProtocolBody;
  followUpUserInCharge: number;
}

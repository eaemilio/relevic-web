import { AttentionProtocol, AttentionProtocolBody } from './attention-protocol';
import { DemographicForm, DemographicFormBody } from './demographic-form';
import { FollowUpNote } from './follow-up';
import { ServiceProvider } from './provider';
import { SurvivorEvaluation, SurvivorEvaluationBody } from './survivor-evaluation';
import { CurrentUser, UserManager } from './user';
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

export interface Comment {
  id: number;
  text: string;
  user: UserManager;
  createdAt: string;
}

export interface CommentBody {
  text: string;
  userId: number;
  caseId: number;
}

export interface NetworkCase {
  id: number;
  description: string;
  victim: Victim;
  provider: ServiceProvider;
  userInCharge: UserManager;
  consent: boolean;
  demographicForm: DemographicForm;
  initialSurvivorEvaluation: SurvivorEvaluation;
  finalSurvivorEvaluation: SurvivorEvaluation;
  postSurvivorEvaluation: SurvivorEvaluation;
  attentionProtocol: AttentionProtocol;
  followUpUserInCharge: UserManager;
  followUpNotes: FollowUpNote[];
  createdAt: string;
  comments: Comment[];
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
  followUpUserInChargeId: number;
}

export const CASE_BASE_URL = '/case';
export const COMMENT_BASE_URL = '/comment';

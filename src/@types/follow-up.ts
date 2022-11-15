import { CurrentUser } from './user';

export interface FollowUpNote {
  id: number;
  caseId: number;
  description: string;
  victimThoughts: string;
  observations: string;
  topics: string;
  comprehension: string;
  needs: string;
  survivorPlan: string;
  evaluatorPlan: string;
  userInCharge: CurrentUser | null;
  createdAt: string;
  dueDate: string;
  completed: boolean;
}

export interface FollowUpNoteBody {
  caseId: number;
  description: string;
  victimThoughts: string;
  observations: string;
  topics: string;
  comprehension: string;
  needs: string;
  survivorPlan: string;
  evaluatorPlan: string;
  userInChargeId: number;
  dueDate: string;
  completed: boolean;
}

export const FOLLOW_UP_BASE_URL = '/follow-up-note';

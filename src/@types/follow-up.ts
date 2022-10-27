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
  userInChargeId: string;
}

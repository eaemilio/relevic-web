export interface AttentionProtocol {
  id: number;
  caseId: number;
  data: string;
  confidentiality: boolean;
  consent: boolean;
  treatment: boolean;
  security: string;
  legalProtection: string;
  mental: string;
  financial: string;
  social: string;
  physical: string;
  strengths: string;
  comments: string;
  userInChargeId: string;
  completed: boolean;
}

export type AttentionProtocolBody = Omit<AttentionProtocol, 'id'>;

export const EMPTY_ATTENTION_PROTOCOL: AttentionProtocolBody = {
  caseId: 0,
  data: '',
  confidentiality: false,
  consent: false,
  treatment: false,
  security: '',
  legalProtection: '',
  mental: '',
  financial: '',
  social: '',
  physical: '',
  strengths: '',
  comments: '',
  userInChargeId: '',
  completed: false,
};

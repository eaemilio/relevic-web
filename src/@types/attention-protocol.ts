import { GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { UserManager } from './user';

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
  userInCharge: UserManager;
  completed: boolean;
  createdAt: string;
}

export type AttentionProtocolBody = {
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
  userInChargeId: number;
  completed: boolean;
};

export const EMPTY_ATTENTION_PROTOCOL: AttentionProtocolBody = {
  caseId: 0,
  data: '',
  confidentiality: false,
  consent: false,
  treatment: false,
  security: '[]',
  legalProtection: '[]',
  mental: '[]',
  financial: '[]',
  social: '[]',
  physical: '[]',
  strengths: '',
  comments: '',
  userInChargeId: 1,
  completed: false,
};

export interface AttentionProtocolRow {
  id: string;
  mainGoal: string;
  dueDate: string;
  goals: string;
  goalsDueDate: string;
  status: string;
  providedBy: string;
  comments: string;
}

export type AttentioProtocolArea =
  | 'security'
  | 'legalProtection'
  | 'mental'
  | 'financial'
  | 'social'
  | 'physical';

export const ATTENTION_PROTOCOL_BASE_URL = '/attention-protocol';

export const ATTENTION_PROTOCOL_COLUMNS: GridColumns = [
  { field: 'mainGoal', headerName: 'Meta', width: 350, editable: true },
  {
    field: 'dueDate',
    headerName: 'Fecha Objetiva',
    type: 'date',
    editable: true,
    width: 220,
    valueGetter: (params: GridValueGetterParams) => dayjs(params.row.dueDate).format('DD/MM/YYYY'),
  },
  {
    field: 'goals',
    headerName: 'Objetivos',
    editable: true,
    width: 350,
  },
  {
    field: 'goalsDueDate',
    headerName: 'Fecha Objetiva',
    type: 'date',
    width: 220,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.row.goalsDueDate).format('DD/MM/YYYY'),
  },
  {
    field: 'status',
    headerName: 'Estado',
    editable: true,
  },
  {
    field: 'providedBy',
    headerName: 'Proporcionado por',
    width: 220,
    editable: true,
  },
  {
    field: 'comments',
    headerName: 'Comentarios',
    width: 320,
    editable: true,
  },
];

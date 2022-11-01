import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { AttentionProtocol, ATTENTION_PROTOCOL_BASE_URL } from 'src/@types/attention-protocol';
import { DemographicForm, DEMOGRAPHIC_FORM_BASE_URL } from 'src/@types/demographic-form';
import { SurvivorEvaluation, SURVIVOR_EVALUATION_BASE_URL } from 'src/@types/survivor-evaluation';
import { MyWork } from 'src/sections/@dashboard/general/app/AppNewInvoice';
import useSWR from 'swr';
import useAuth from './useAuth';

export default function useMyWork() {
  const { user } = useAuth();
  const { data: survivorEvaluationForms = [] } = useSWR<SurvivorEvaluation[]>(
    user ? `${SURVIVOR_EVALUATION_BASE_URL}/user/${user.id}` : null
  );
  const { data: demographicForms = [] } = useSWR<DemographicForm[]>(
    user ? `${DEMOGRAPHIC_FORM_BASE_URL}/user/${user.id}` : null
  );
  const { data: attentionProtocolForms = [] } = useSWR<AttentionProtocol[]>(
    user ? `${ATTENTION_PROTOCOL_BASE_URL}/user/${user.id}` : null
  );

  const [data, setData] = useState<MyWork[]>([]);

  const getAntiquity = (dateString: string): number => {
    const today = dayjs();
    const date = dayjs(dateString);
    return today.diff(date, 'day');
  };

  useEffect(() => {
    const eso: MyWork[] = survivorEvaluationForms
      .filter((s) => s.completed === false)
      .map<MyWork>((s) => ({
        caseId: s.caseId,
        description: 'Realizar Evaluación del Sobreviviente',
        isFollowUp: false,
        antiquity: getAntiquity(s.createdAt),
      }));

    const demographic: MyWork[] = demographicForms
      .filter((s) => s.completed === false)
      .map<MyWork>((s) => ({
        caseId: s.caseId,
        description: 'Completar Formulario Demográfico',
        isFollowUp: false,
        antiquity: getAntiquity(s.createdAt),
      }));

    const attention: MyWork[] = attentionProtocolForms
      .filter((s) => s.completed === false)
      .map<MyWork>((s) => ({
        caseId: s.caseId,
        description: 'Realizar Protocolo de Atención',
        isFollowUp: false,
        antiquity: getAntiquity(s.createdAt),
      }));

    setData([...demographic, ...eso, ...attention]);
  }, [survivorEvaluationForms, demographicForms, attentionProtocolForms]);

  return data;
}

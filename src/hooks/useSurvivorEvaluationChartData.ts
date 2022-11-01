import { useEffect, useState } from 'react';
import { Roles } from 'src/@types/role';
import {
  SurvivorEvaluation,
  SurvivorEvaluationPhase,
  SURVIVOR_EVALUATION_BASE_URL,
} from 'src/@types/survivor-evaluation';
import { CurrentUser } from 'src/@types/user';
import useSWR from 'swr';
import useAuth from './useAuth';

export default function useSurvivorEvaluationChartData(phase: SurvivorEvaluationPhase) {
  const { user } = useAuth();
  const isAgent = (user as CurrentUser | null)?.role.id === Roles.AGENTE;
  const userId = (user as CurrentUser | null)?.id;
  const providerId = (user as CurrentUser | null)?.provider.id;

  const { data: evaluations = [] } = useSWR<SurvivorEvaluation[]>(
    isAgent
      ? userId
        ? `${SURVIVOR_EVALUATION_BASE_URL}/user/${userId}`
        : null
      : SURVIVOR_EVALUATION_BASE_URL
  );

  const [data, setData] = useState([
    { label: 'Muy Vulnerable', value: 0 },
    { label: 'Vulnerable', value: 0 },
    { label: 'Estable', value: 0 },
    { label: 'Muy Estable', value: 0 },
  ]);

  useEffect(() => {
    let filtered = evaluations.filter((e) => e.phase === phase);

    if (providerId !== 1) {
      filtered = filtered.filter((e) => e.userInCharge.provider.id === providerId);
    }

    const veryVulnerable = filtered.filter((e) => e.total <= 1).length;
    const vulnerable = filtered.filter((e) => e.total > 1 && e.total <= 2).length;
    const stable = filtered.filter((e) => e.total > 2 && e.total <= 3).length;
    const veryStable = filtered.filter((e) => e.total > 3).length;

    setData([
      { label: 'Muy Vulnerable', value: veryVulnerable },
      { label: 'Vulnerable', value: vulnerable },
      { label: 'Estable', value: stable },
      { label: 'Muy Estable', value: veryStable },
    ]);
  }, [evaluations, phase]);

  return data;
}

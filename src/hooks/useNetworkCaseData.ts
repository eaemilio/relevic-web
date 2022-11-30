import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { Roles } from 'src/@types/role';
import { CurrentUser } from 'src/@types/user';
import useSWR from 'swr';
import useAuth from './useAuth';

export default function useNetworkCaseData() {
  const { user } = useAuth();
  const isAgent = (user as CurrentUser | null)?.role?.id === Roles.AGENTE;
  const userId = (user as CurrentUser | null)?.id;
  const providerId = (user as CurrentUser | null)?.provider?.id;

  const { data: cases = [] } = useSWR<NetworkCase[]>(
    isAgent
      ? userId
        ? `${CASE_BASE_URL}/user/${userId}`
        : null
      : providerId === 1
      ? CASE_BASE_URL
      : providerId
      ? `${CASE_BASE_URL}/provider/${providerId}`
      : null
  );

  return { cases };
}

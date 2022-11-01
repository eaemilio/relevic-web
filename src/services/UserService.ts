import { CurrentUser, UserBody } from 'src/@types/user';
import axiosInstance from 'src/utils/axios';

export const createUser = async (body: UserBody): Promise<CurrentUser> => {
  const user = await axiosInstance.post<CurrentUser>('/auth/register', body);
  return user.data;
};

export const editUser = async (id: number, body: UserBody): Promise<CurrentUser> => {
  const user = await axiosInstance.put<CurrentUser>(`/user/${id}`, body);
  return user.data;
};

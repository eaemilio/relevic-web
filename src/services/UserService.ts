import { UserManager } from 'src/@types/user';
import axiosInstance from 'src/utils/axios';

export const createUser = async (
  body: UserManager & { password: string }
): Promise<UserManager> => {
  const user = await axiosInstance.post<UserManager>('/auth/register', body);
  return user.data;
};

export const editUser = async (id: number, body: UserManager): Promise<UserManager> => {
  const user = await axiosInstance.put<UserManager>(`/user/${id}`, body);
  return user.data;
};

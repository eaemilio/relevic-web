import { UserManager } from 'src/@types/user';
import axiosInstance from 'src/utils/axios';

const BASE_URL = '/user';

export default class UserService {
  static getAll = async (): Promise<UserManager[]> => {
    const result = await axiosInstance.get(BASE_URL);
    return result.data;
  };

  static getSingle = async (id: number): Promise<UserManager> => {
    const result = await axiosInstance.get(`${BASE_URL}/${id}`);
    return result.data;
  };

  static create = async (body: Partial<UserManager>): Promise<UserManager> => {
    const result = await axiosInstance.post(BASE_URL, body);
    return result.data;
  };
}

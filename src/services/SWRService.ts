import axiosInstance from 'src/utils/axios';

export default class SWRService {
  static getAll = async <T>(url: string): Promise<T> => {
    const result = await axiosInstance.get<T>(url);
    return result.data;
  };
}

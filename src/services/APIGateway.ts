import axiosInstance from 'src/utils/axios';

export const getAsync = async <T>(route: string): Promise<T> => {
  const result = await axiosInstance.get<T>(route);
  return result.data;
};

export const createAsync = async <T, K = T>(route: string, body: T): Promise<K> => {
  const result = await axiosInstance.post<K>(route, body);
  return result.data;
};

export const editAsync = async <T, K = T>(route: string, body: T): Promise<K> => {
  const result = await axiosInstance.put<K>(route, body);
  return result.data;
};

export const removeAsync = async <T>(route: string): Promise<T> => {
  const result = await axiosInstance.delete<T>(route);
  return result.data;
};

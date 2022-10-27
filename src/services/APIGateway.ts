import axiosInstance from 'src/utils/axios';

export const getAsync = async <T>(route: string): Promise<T> => {
  const result = await axiosInstance.get<T>(route);
  return result.data;
};

export const createAsync = async <T>(route: string, body: T): Promise<T> => {
  const result = await axiosInstance.post<T>(route, body);
  return result.data;
};

export const editAsync = async <T>(route: string, body: T): Promise<T> => {
  const result = await axiosInstance.put<T>(route, body);
  return result.data;
};

export const removeAsync = async <T>(route: string): Promise<T> => {
  const result = await axiosInstance.delete<T>(route);
  return result.data;
};

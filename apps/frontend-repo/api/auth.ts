import { UserAuth } from '@shared/types/user';
import axios from './axios';

export const fetchLogin = async (body: UserAuth) => {
  const res = await axios.post('/login', body);
  return res.data;
};
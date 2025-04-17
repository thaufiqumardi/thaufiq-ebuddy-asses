import axios from './axios';
import cookie from 'js-cookie';

export const fetchUsers = async (params: { cursor?: number; limit?: number }) => {
  const token = cookie.get('token')
  console.log('token', token);

  const headers = {
    'Authorization': `Bearer ${token}`,
  }

  const res = await axios.get('/fetch-user-data', { 
    headers: token ? headers : undefined, // Only include headers if token is present
    params 
  });
  return res.data;
};
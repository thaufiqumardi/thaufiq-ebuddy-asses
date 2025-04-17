import axios from './axios';

export const fetchUsers = async (params: { cursor?: number; limit?: number }) => {
  const res = await axios.get('/fetch-user-data', { 
    headers: {
      'Authorization': `Bearer smy-secret-token`,
    },
    params 
  });
  return res.data;
};
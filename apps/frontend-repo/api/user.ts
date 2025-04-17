import axios from 'axios';

export const fetchUsers = async (params: { cursor?: number; limit?: number }) => {
  const res = await axios.get('http://localhost:4000/e-buddy-assessment/us-central1/api/fetch-user-data', { 
    headers: {
      'Authorization': `Bearer my-secret-token`,
    },
    params 
  });
  return res.data;
};
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


//  for get all emails
export const getEmails = async () => {
  const res = await axios.get(`${VITE_API_BASE_URL}/api/emails`);
  return res.data;
};


// get email by id
export const getEmailById = async (id) => {
  const res = await axios.get(`${VITE_API_BASE_URL}/api/emails/${id}`);
  return res.data;
};


// get new emails
export const fetchNewEmails = async () => {
  const res = await axios.get(`${VITE_API_BASE_URL}/api/emails/fetch`);
  return res.data;
};

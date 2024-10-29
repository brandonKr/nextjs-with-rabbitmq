import axios, { AxiosResponse } from 'axios';

export const PostMq = async (params) =>
    axios.post(`http://localhost:3000/api/postque`, params);
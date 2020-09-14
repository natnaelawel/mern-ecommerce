import axios from 'axios'
import config from '../config'
import { isAuthenticated } from './auth';



const instance = axios.create({
  baseURL: config.API_URL,
});
export default instance
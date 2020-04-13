import MockApi from './MockApi';
import LiveApi from './LiveApi';

export default (process.env.NODE_ENV && process.env.NODE_ENV !== 'production')
  ? MockApi
  : LiveApi;

const PRODUCTION_ENV = 'production';
const STAGING_ENV = 'staging';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const BASE_URL = ((env) => {
  switch (env) {
    case PRODUCTION_ENV:
      return 'https://api-platform-engineering-aws.example.app';
    case STAGING_ENV:
      return 'http://192.168.1.68:4000';
    default:
      return API_URL || 'http://localhost:4000';
  }
})(import.meta.env.VITE_ENV);
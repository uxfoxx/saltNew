import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestOptions {
  contentType?: string;
  includeAuthorization?: boolean;
}

const DEFAULT_CONTENT_TYPE = 'application/json';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': DEFAULT_CONTENT_TYPE,
  },
});

// Add an interceptor to attach the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers.Authorization !== false) {
    // Only add Authorization header if includeAuthorization is not explicitly set to false
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const request = async (
  url: string,
  method: AxiosRequestConfig['method'],
  data?: unknown,
  options?: RequestOptions,
): Promise<AxiosResponse> => {

  const requestOptions: AxiosRequestConfig = {
    url,
    method,
    data,
    headers: {},
  };

  if (options?.contentType) {
    requestOptions.headers = requestOptions.headers ?? {};
    requestOptions.headers['Content-Type'] = options?.contentType ?? DEFAULT_CONTENT_TYPE;
  }

  try {
    const response = await axiosInstance(requestOptions);
    return response;
  } catch (error) {
    // Check if the error is a 403 Forbidden response
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      // Handle 403 Forbidden error here (e.g., redirect, show an error message)
      // console.error('403 Forbidden Error:', error);
      throw error; // Rethrow the error if needed
    } else {
      // For other errors, just rethrow
      throw error;
    }
  }
};

export const GET = async (url: string, options?: RequestOptions): Promise<AxiosResponse> => {
  return request(url, 'GET', undefined, options);
};

export const POST = async (
  url: string,
  data?: unknown,
  options?: RequestOptions
): Promise<AxiosResponse> => {
  return request(url, 'POST', data, options);
};

export const PUT = async (
  url: string,
  data?: unknown,
  options?: RequestOptions
): Promise<AxiosResponse> => {
  return request(url, 'PUT', data, options);
};

export const DELETE = async (url: string, options?: RequestOptions): Promise<AxiosResponse> => {
  return request(url, 'DELETE', undefined, options);
}

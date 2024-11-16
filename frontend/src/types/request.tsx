import {Method} from 'axios';

export interface RequestState<T = any> {
  data: T | null;
  loading: boolean;
  error: boolean;
  errorData: any;
  success: boolean;
}

export interface RequestParameters {
  id?: string | number;
  data?: any;
  params?: any;
  force?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onFinal?: () => void;
}

export const initialState: RequestState = {
  data: null,
  loading: false,
  error: false,
  errorData: null,
  success: false,
};

export interface GlobalState {
  requests: {[key: string]: RequestState};
  execute: (
    key: string,
    config: RequestConfig,
    parameters?: RequestParameters,
  ) => void;
}

export type RequestConfig = {
  method: Method;
  url: string;
  isAuth?: boolean;
};

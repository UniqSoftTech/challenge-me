import {useCallback, useEffect, useRef, useState} from 'react';
import {Method} from 'axios';
import {RequestConfig, RequestParameters} from '../types/request';
import useGlobalRequestStore from './useGlobalRequestStore';

interface UseRequestOptions {
  key: string;
  method?: Method;
  url: string;
  params?: RequestParameters;
  autoExecute?: boolean;
  isAuth?: boolean;
}

const useRequest = ({
  key,
  method = 'GET',
  url,
  params = {},
  autoExecute = true,
  isAuth = false,
}: UseRequestOptions) => {
  const {requests, execute} = useGlobalRequestStore();
  const [shouldExecute, setShouldExecute] = useState(autoExecute);
  const hasExecutedRef = useRef(false);

  const trigger = useCallback(() => {
    setShouldExecute(true);
  }, [setShouldExecute]);

  useEffect(() => {
    if (shouldExecute && !hasExecutedRef.current) {
      hasExecutedRef.current = true;
      const config: RequestConfig = {method, url, isAuth};
      execute(key, config, params);
      setShouldExecute(false);
      hasExecutedRef.current = false; // Reset the flag for future triggers
    }
  }, [shouldExecute, key, method, url, params, execute, isAuth]);

  return {
    ...(requests[key] || {
      loading: false,
      data: null,
      error: false,
      errorData: null,
      success: false,
    }),
    trigger,
  };
};

export default useRequest;

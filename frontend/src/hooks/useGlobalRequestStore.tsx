import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios"; // Import axios if not already imported
import {
  GlobalState,
  initialState,
  RequestConfig,
  RequestParameters,
} from "../types/request";
import { api, firebaseApi } from "../fetch/api";
import { toast } from "react-toastify";

type GlobalStateCreator = StateCreator<GlobalState>;

const store: GlobalStateCreator = (set, get) => ({
  requests: {},

  execute: async (
    key: string,
    config: RequestConfig,
    parameters: RequestParameters = {},
  ) => {
    const { data, params, force, onSuccess, onError, onFinal } = parameters;
    const { requests } = get();
    const existingRequest = requests[key] || initialState;

    // Prevent executing the same request if it's already loading unless forced
    if (!force && existingRequest.loading) {
      return;
    }

    // Set loading state while keeping existing data
    set((state) => ({
      requests: {
        ...state.requests,
        [key]: {
          ...state.requests[key], // Keep existing data
          loading: true,
          error: false, // Reset error state if reloading
        },
      },
    }));

    const axiosInstance = config.isAuth ? firebaseApi : api;

    try {
      const res = await axiosInstance({
        method: config.method,
        url: config.url,
        data,
        params,
      });

      // Update the state with the new data while keeping existing data
      set((state) => ({
        requests: {
          ...state.requests,
          [key]: {
            ...state.requests[key], // Keep existing data
            success: true,
            loading: false,
            data: res.data, // Replace with new data
          },
        },
      }));

      onSuccess?.(res);
    } catch (err) {
      // Check if it's an Axios error and has a response
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;

        if (statusCode === 401) {
          await localStorage.removeItem("token");

          // toast("Error sending request.", { type: "error" });
          // showMessage({
          //   message: 'Session хугацаа дууссан',
          //   description: 'Дахин нэвтэрнэ үү.',
          //   type: 'warning',
          //   icon: 'auto',
          //   duration: 3000,
          //   style: {
          //     backgroundColor: '#FF4C4C',
          //   },
          //   titleStyle: {
          //     fontWeight: 'bold',
          //   },
          //   textStyle: {
          //     fontSize: 14,
          //   },
          // });
          // navigate('Login');
        } else {
          set((state) => ({
            requests: {
              ...state.requests,
              [key]: {
                ...state.requests[key],
                loading: false,
                error: true,
                errorData: err,
              },
            },
          }));

          // toast("Error sending request.", { type: "error" });
          // showMessage({
          //   message: 'Алдаа',
          //   description: 'Хүсэлтэнд алдаа гарлаа.',
          //   type: 'danger',
          //   icon: 'auto',
          //   duration: 3000,
          //   style: {
          //     backgroundColor: '#FF4C4C',
          //   },
          //   titleStyle: {
          //     fontWeight: 'bold',
          //   },
          //   textStyle: {
          //     fontSize: 14,
          //   },
          // });

          onError?.(err);
        }
      } else {
        set((state) => ({
          requests: {
            ...state.requests,
            [key]: {
              ...state.requests[key],
              loading: false,
              error: true,
              errorData: err,
            },
          },
        }));
        // toast("Хүсэлтэнд алдаа гарлаа.", { type: "error" });
        // showMessage({
        //   message: 'Алдаа',
        //   description: 'Хүсэлтэнд алдаа гарлаа.',
        //   type: 'danger',
        //   icon: 'auto',
        //   duration: 3000,
        //   style: {
        //     backgroundColor: '#FF4C4C',
        //   },
        //   titleStyle: {
        //     fontWeight: 'bold',
        //   },
        //   textStyle: {
        //     fontSize: 14,
        //   },
        // });

        onError?.(err);
      }
    } finally {
      onFinal?.();
    }
  },
});

const useGlobalRequestStore = create<GlobalState>()(
  devtools(store, { name: "GlobalRequestStore" }),
);

export default useGlobalRequestStore;

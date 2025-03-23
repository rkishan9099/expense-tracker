/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import API_END_POINTS from "../../routes/api-path";
import { ApiResponse, ApiStatus } from "../../type/app.type";
import toast from "react-hot-toast";

interface InitialStateType {
  expenses: any[];
  loading: boolean;
  error: string;
  selectedExpense: any;
}
const initialState: InitialStateType = {
  expenses: [],
  loading: false,
  error: "",
  selectedExpense: null,
};
const slice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = "";
    },
    setselectedExpemses: (state, action) => {
      state.selectedExpense = action.payload;
      state.loading = false;
      state.error = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { setLoading, setError, setExpenses, setselectedExpemses } =
  slice.actions;


  
  export const fetchExpenses =
    (filter: Record<string, any> = {}) =>
    async (dispatch: Dispatch) => {
      dispatch(setLoading(true));
      try {
        const res: ApiResponse = await axiosInstance.get(
          API_END_POINTS.expenses.get,
          { params: filter } // ✅ Pass object directly
        );
  
        if (res.status === ApiStatus.success) {
          dispatch(setExpenses(res.data));
        } else {
          dispatch(setError(res.message));
          toast.error(res.message);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false)); // ✅ Ensure loading state is updated
      }
    };
  
export const getExpenseDetails = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.expenses.details(id)
    );
    if (res.status === ApiStatus.success) {
      dispatch(setselectedExpemses(res.data));
    } else {
      dispatch(setError(res.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const addExpenses = async (data: any): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.post(
      API_END_POINTS.expenses.add,
      data
    );
    return res;
  } catch (error: any) {
    return {
      status: ApiStatus.error,
      message: error?.message,
    };
  }
};

export const editExpenses = async (
  id: string,
  data: any
): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.put(
      API_END_POINTS.expenses.edit(id),
      data
    );
    return res;
  } catch (error: any) {
    return {
      status: ApiStatus.error,
      message: error?.message,
    };
  }
};

export const deleteExpenses = async (id: string): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.delete(
      API_END_POINTS.expenses.delete(id)
    );
    return res;
  } catch (error: any) {
    return {
      status: ApiStatus.error,
      message: error?.message,
    };
  }
};

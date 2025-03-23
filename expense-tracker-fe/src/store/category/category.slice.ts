/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import API_END_POINTS from "../../routes/api-path";
import { ApiResponse, ApiStatus } from "../../type/app.type";

const slice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
    error: "",
    selectedCategory: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategories: (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.error = "";
    },
    setSelctedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const { setLoading, setError, setCategories ,setSelctedCategory} = slice.actions;

export const fetchCategories = (filter: Record<string, any> ={}) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(API_END_POINTS.category.get,{params:filter});
    if (res.status === ApiStatus.success) {
      console.debug("sss",res.data)
      dispatch(setCategories(res.data))
    }else{
      dispatch(setError(res.message))
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};



export const addCategory = async (data: any): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.post(
      API_END_POINTS.category.add,
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

export const editCategory = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.put(
      API_END_POINTS.category.edit(id),
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

export const getCategoryDetails = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.category.details(id)
    );
    if (res.status === ApiStatus.success) {
      dispatch(setSelctedCategory(res.data));
    } else {
      dispatch(setError(res.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const deleteCategory = async (id: string): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.delete(
      API_END_POINTS.category.delete(id)
    );
    return res;
  } catch (error: any) {
    return {
      status: ApiStatus.error,
      message: error?.message,
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import API_END_POINTS from "../../routes/api-path";
import { ApiResponse, ApiStatus } from "../../type/app.type";

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: "",
    selectedUser: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = "";
    },
    setSelctedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.loading = false;
      state.error = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { setLoading, setError, setUsers, setSelctedUser } = slice.actions;

export const fetchUsers =
  (filter: Record<string, any> = {}) =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const res: ApiResponse = await axiosInstance.get(
        API_END_POINTS.users.get,
        { params: filter } // ✅ Pass object directly
      );
      if (res.status === ApiStatus.success) {
        dispatch(setUsers(res.data));
      } else {
        dispatch(setError(res.message));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const addUser = async (data: any): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.post(
      API_END_POINTS.users.add,
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

export const editUser = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.put(
      API_END_POINTS.users.edit(id),
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

export const getUserDetails = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.users.details(id)
    );
    if (res.status === ApiStatus.success) {
      dispatch(setSelctedUser(res.data));
    } else {
      dispatch(setError(res.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const deleteUser = async (id: string): Promise<ApiResponse> => {
  try {
    const res: ApiResponse = await axiosInstance.delete(
      API_END_POINTS.users.delete(id)
    );
    return res;
  } catch (error: any) {
    return {
      status: ApiStatus.error,
      message: error?.message,
    };
  }
};

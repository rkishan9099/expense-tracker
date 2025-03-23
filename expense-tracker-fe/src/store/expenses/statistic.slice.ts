/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import API_END_POINTS from "../../routes/api-path";
import { ApiResponse, ApiStatus } from "../../type/app.type";
import toast from "react-hot-toast";

interface InitialStateType {
  statistic1: any[];
  statistic2: any[];
  statistic3: any[];
  loading: boolean;
}

type Keys = keyof typeof initialState;

type UpdateStatePayloadType = {
  key: keyof InitialStateType;
  value: (typeof initialState)[Keys]; // You may want to replace 'any' with the actual type of your state properties
};

const initialState: InitialStateType = {
  statistic1: [],
  statistic2: [],
  statistic3: [],
  loading: false,
};
const slice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateStasticsState(state, action: PayloadAction<UpdateStatePayloadType>) {
      const { key, value } = action.payload;

      //@ts-ignore
      state[key] = value;
    },
  },
});

export default slice.reducer;

const { setLoading, updateStasticsState } = slice.actions;

export const fetchStatistic1 = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.statistic.get1
    );

    if (res.status === ApiStatus.success) {
      dispatch(updateStasticsState({ key: "statistic1", value: res.data }));
    } else {
      toast.error(res.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false)); // ✅ Ensure loading state is updated
  }
};

export const fetchStatistic2 = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.statistic.get2
    );

    if (res.status === ApiStatus.success) {
      dispatch(updateStasticsState({ key: "statistic2", value: res.data }));
    } else {
      toast.error(res.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false)); // ✅ Ensure loading state is updated
  }
};

export const fetchStatistic3 = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res: ApiResponse = await axiosInstance.get(
      API_END_POINTS.statistic.get3
    );

    if (res.status === ApiStatus.success) {
      dispatch(updateStasticsState({ key: "statistic3", value: res.data }));
    } else {
      toast.error(res.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false)); // ✅ Ensure loading state is updated
  }
};

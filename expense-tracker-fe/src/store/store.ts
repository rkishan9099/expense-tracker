import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import users from "./users/user.slice";
import category from "./category/category.slice";
import expenses from "./expenses/expenses.slice";
import statistic from "./expenses/statistic.slice";
export const store = configureStore({
  reducer: {
    users,
    category,
    expenses,
    statistic
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

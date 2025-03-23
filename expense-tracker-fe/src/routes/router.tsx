import MainLayout from "../components/layout/main-layout"
import ExpensesPage from "../page/expenses/expenses"
import AddExpenses from "../page/expenses/add"
import EditExpense from "../page/expenses/edit"
import ViewExpense from "../page/expenses/view"
import HomePage from "../page/home"
import UserPage from "../page/users/users"
import AddUsers from "../page/users/add"
import EditUsers from "../page/users/edit"
import ViewUser from "../page/users/view"
import APP_PATH from "./app-path"
import CategoryPage from "../page/category/category"

/* eslint-disable @typescript-eslint/no-explicit-any */
const Routes: any = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: APP_PATH.users.list,
                element: <UserPage />
            },

            {
                path: APP_PATH.users.add,
                element: <AddUsers />
            },
            {
                path: APP_PATH.users.editPath,
                element: <EditUsers />
            },
            {
                path: APP_PATH.users.viewPath,
                element: <ViewUser />
            },
            {
                path: APP_PATH.expenses.list,
                element: <ExpensesPage />
            },
            {
                path: APP_PATH.expenses.add,
                element: <AddExpenses />
            },
            {
                path: APP_PATH.expenses.editPath,
                element: <EditExpense />
            },
            {
                path: APP_PATH.expenses.viewPath,
                element: <ViewExpense />
            },

            /// Category path
            {
                path: APP_PATH.category.list,
                element: <CategoryPage />
            }
    
        ]
    }
]

export default Routes
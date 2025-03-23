# Expense Tracker Frontend Documentation

## Project Structure
```
expense-tracker-fe/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ category/
│  │  │  └─ CategoryModal.tsx
│  │  ├─ expenses/
│  │  │  ├─ AddEditExpensesForm.tsx
│  │  │  └─ FilterComponent.tsx
│  │  ├─ home/
│  │  │  ├─ StatisticOne.tsx
│  │  │  ├─ StatisticThree.tsx
│  │  │  └─ StatisticTwo.tsx
│  │  ├─ layout/
│  │  │  └─ main-layout.tsx
│  │  └─ users/
│  │     ├─ AddEditUsersForm.tsx
│  │     └─ FilterComponent.tsx
│  ├─ data/
│  │  └─ navigation-menu.tsx
│  ├─ lib/
│  │  ├─ axios.ts
│  │  └─ utils.ts
│  ├─ page/
│  │  ├─ category/
│  │  │  └─ category.tsx
│  │  ├─ expenses/
│  │  │  ├─ add.tsx
│  │  │  ├─ edit.tsx
│  │  │  ├─ expenses.tsx
│  │  │  └─ view.tsx
│  │  ├─ users/
│  │  │  ├─ add.tsx
│  │  │  ├─ edit.tsx
│  │  │  ├─ users.tsx
│  │  │  └─ view.tsx
│  │  └─ home.tsx
│  ├─ routes/
│  │  ├─ api-path.ts
│  │  ├─ app-path.ts
│  │  └─ router.tsx
│  ├─ store/
│  │  ├─ category/
│  │  │  └─ category.slice.ts
│  │  ├─ expenses/
│  │  │  ├─ expenses.slice.ts
│  │  │  └─ statistic.slice.ts
│  │  ├─ users/
│  │  │  └─ user.slice.ts
│  │  └─ store.ts
│  ├─ type/
│  │  └─ app.type.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ .env
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## UI Framework
This project uses **Ant Design** for UI components.

## Navigation Menu (`navigation-menu.tsx`)
Defines sidebar navigation paths:
```tsx
import {
  UserOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import APP_PATH from "../routes/app-path";

const NavigationMenu = [
  {
    key: APP_PATH.dashboard.Label,
    icon: <DashboardOutlined />, // Dashboard Icon
    label: APP_PATH.dashboard.Label,
    path: "/",
  },
  {
    key: APP_PATH.users.Label,
    icon: <UserOutlined />, // User Icon for Users
    label: APP_PATH.users.Label,
    path: APP_PATH.users.list,
  },
  {
    key: APP_PATH.expenses.Label,
    icon: <CreditCardOutlined />, // Credit Card Icon for Expenses
    label: APP_PATH.expenses.Label,
    path: APP_PATH.expenses.list,
  },
  {
    key: APP_PATH.category.Label,
    icon: <AppstoreOutlined />, // Appstore Icon for Category
    label: APP_PATH.category.Label,
    path: APP_PATH.category.list,
  },
];

export default NavigationMenu;
```

## API Endpoints (`api-path.ts`)
Defines all backend API endpoints.

## Routing (`router.tsx`)
Manages React Router DOM paths.

## Environment Variables (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Axios Instance (`lib/axios.ts`)
Creates an Axios instance for API requests:
```tsx
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../type/app.type";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response): AxiosResponse<ApiResponse> => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response?.data);
  }
);

export default axiosInstance;
```

Let me know if you need more details! 🚀


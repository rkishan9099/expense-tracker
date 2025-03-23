# Expense Tracker Backend Documentation

## Project Structure
```
expense-tracker-be/
├─ src/
│  ├─ controllers/
│  │  ├─ category.controller.ts
│  │  ├─ dashboard.controller.ts
│  │  ├─ expense.controller.ts
│  │  └─ user.controller.ts
│  ├─ database/
│  │  └─ db.ts
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ middlewares/
│  │  └─ validateWithZod.ts
│  ├─ models/
│  │  ├─ category.model.ts
│  │  ├─ expense.model.ts
│  │  └─ user.modal.ts
│  ├─ routes/
│  │  ├─ category.routes.ts
│  │  ├─ dashboard.routes.ts
│  │  ├─ expense.routes.ts
│  │  └─ user.routes.ts
│  ├─ schemas/
│  │  ├─ category.schema.ts
│  │  ├─ expense.schema.ts
│  │  └─ user.schema.ts
│  └─ server.ts
├─ .env
├─ .eslintignore
├─ .eslintrc.json
├─ .prettierrc.json
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ tsconfig.json
```

## Description
This is a backend service for an Expense Tracker application built using Node.js and TypeScript. It provides API endpoints for managing users, expenses, categories, and dashboard statistics.

## Technologies Used
- **Node.js**
- **TypeScript**
- **Express.js**
- **Zod** (for validation)
- **MySQL** (Database)

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/expense-tracker-be.git
   cd expense-tracker-be
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=expenses-tacker
   PORT=5000
   ```
4. Start the development server:
   ```sh
   npm run start:dev
   ```

## Dashboard Queries Explanation

### **1. Top 3 Spending Days per User (`Statistics1`)**
This query retrieves the top 3 days with the highest spending for each user.

#### **Step-by-Step Breakdown:**
1. **Calculate daily total spending per user:**
   ```sql
   SELECT e.user_id, u.name AS user_name, e.date, SUM(e.amount) AS total_spent
   FROM expenses e
   JOIN users u ON e.user_id = u.id
   GROUP BY e.user_id, e.date;
   ```
2. **Rank each spending day per user:**
   ```sql
   ROW_NUMBER() OVER (PARTITION BY e.user_id ORDER BY SUM(e.amount) DESC) AS `rank`
   ```
3. **Filter only the top 3 highest spending days per user:**
   ```sql
   WHERE `rank` <= 3;
   ```

### **2. Monthly Expenditure Percentage Change (`Statistics2`)**
This query calculates the percentage change in spending month-over-month for each user.

#### **Step-by-Step Breakdown:**
1. **Summarize expenses per user per month:**
   ```sql
   SELECT e.user_id, u.name AS user_name, DATE_FORMAT(e.date, '%Y-%m') AS month, SUM(e.amount) AS total_spent
   FROM expenses e
   JOIN users u ON e.user_id = u.id
   GROUP BY e.user_id, u.name, DATE_FORMAT(e.date, '%Y-%m');
   ```
2. **Retrieve the previous month’s spending for each user:**
   ```sql
   LAG(me.total_spent) OVER (PARTITION BY me.user_id ORDER BY me.month) AS previous_month_spent
   ```
3. **Calculate the percentage change in spending:**
   ```sql
   CASE WHEN previous_month_spent IS NOT NULL THEN 
        ROUND(((me.total_spent - previous_month_spent) / previous_month_spent) * 100, 2) 
   ELSE NULL END AS percentage_change;
   ```

### **3. Predicted Next Month's Spending (`Statistics3`)**
This query predicts the next month’s spending based on the last 3 months’ average.

#### **Step-by-Step Breakdown:**
1. **Summarize expenses per user per month:**
   ```sql
   SELECT e.user_id, u.name AS user_name, DATE_FORMAT(e.date, '%Y-%m') AS month, SUM(e.amount) AS total_spent
   FROM expenses e
   JOIN users u ON e.user_id = u.id
   GROUP BY e.user_id, u.name, DATE_FORMAT(e.date, '%Y-%m');
   ```
2. **Calculate the 3-month rolling average:**
   ```sql
   ROUND(AVG(me.total_spent) OVER (
      PARTITION BY me.user_id ORDER BY STR_TO_DATE(me.month, '%Y-%m')
      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
   ), 2) AS avg_last_3_months;
   ```
3. **Predict the spending for the next month:**
   ```sql
   DATE_FORMAT(DATE_ADD(STR_TO_DATE(CONCAT(month, '-01'), '%Y-%m-%d'), INTERVAL 1 MONTH), '%Y-%m') AS predicted_month,
   IFNULL(avg_last_3_months, 0) AS predicted_spending;
   ```

This query helps estimate future spending based on historical data trends.

## API Endpoints
- `GET /api/dashboard/statistics1` - Get top 3 spending days per user
- `GET /api/dashboard/statistics2` - Get monthly spending percentage change
- `GET /api/dashboard/statistics3` - Predict next month's spending

## Validation & Error Handling
- Uses **Zod** for request body validation
- Middleware (`validateWithZod.ts`) ensures valid input data
- Express error handling middleware ensures consistent API error responses




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

This project uses **Ant Design** for its UI components, ensuring a consistent, professional, and responsive design across the application.


## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/expense-tracker.git
   cd expense-tracker-be
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```env
    VITE_API_BASE_URL=http://localhost:5000/api

   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

## Components


The `src/components/` directory contains reusable UI components organized by feature:

### Category Components
- **`CategoryModal.tsx`**
  - A modal component for adding or editing expense categories.
  - Displays a form within a popup, integrated with Redux for state updates.

### Expenses Components
- **`AddEditExpensesForm.tsx`**
  - A form for adding or editing expense entries.
  - Includes fields like amount, category, and date; uses Redux for state management.
- **`FilterComponent.tsx`**
  - A filter UI for expenses.
  - Allows filtering by date range, category, or other criteria.

### Home Components
- **`StatisticOne.tsx`**
  - Displays a key statistic (e.g., total expenses) on the dashboard.
  - Pulls data from the Redux statistic slice.
- **`StatisticTwo.tsx`**
  - Shows another statistic (e.g., monthly trends) on the dashboard.
  - Styled with Ant Design for consistency.
- **`StatisticThree.tsx`**
  - Presents a third statistic (e.g., category breakdown) on the dashboard.
  - Responsive and reusable.

### Layout Components
- **`main-layout.tsx`**
  - The main layout wrapper for the application.
  - Includes the sidebar (navigation menu), header, and content area.

### Users Components
- **`AddEditUsersForm.tsx`**
  - A form for adding or editing user details.
  - Fields include name and email; connected to the Redux user slice.
- **`FilterComponent.tsx`**
  - A filter UI for users.
  - Filters users by name, email, or other attributes.

These components are modular, reusable, and leverage Ant Design and Redux for functionality.

---

## Navigation Menu



Defined in `src/data/navigation-menu.tsx`, this configures the sidebar navigation:

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
    icon: <DashboardOutlined />,
    label: APP_PATH.dashboard.Label,
    path: "/",
  }
];

export default NavigationMenu;

```

## API Endpoints

API endpoints are centralized in `src/routes/api-path.ts`. This file defines all backend routes used by the frontend for API requests.


## Routing

Routing is managed with React Router DOM in `src/routes/router.tsx` It maps URLs to specific components for navigation.


## Redux Store

The Redux store uses Redux Toolkit to manage state, split into feature-specific slices.

```sh
store/
├─ category/
│  └─ category.slice.ts
├─ expenses/
│  ├─ expenses.slice.ts
│  └─ statistic.slice.ts
├─ users/
│  └─ user.slice.ts
└─ store.ts

```

## Environment Variables
Defined in `.env`:
```sh
 VITE_API_BASE_URL=http://localhost:5000/api
 ```
 VITE_API_BASE_URL: Base URL for backend API.


 ## Axios Instance
 ```sh
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
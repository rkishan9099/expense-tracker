import { 
    UserOutlined, 
    DashboardOutlined, 
    CreditCardOutlined, 
    AppstoreOutlined 
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
  
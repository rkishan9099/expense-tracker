import { path } from "../lib/utils";

const APP_PATH = {
  dashboard: {
    Label: "Dashboard",
    list: "/list",
  },
  users: {
    Label: "Users",
    list: "/users",
    add: "/users/add",
    editPath: "/users/edit/:id",
    viewPath: "/users/view/:id",
    edit: (id: string) => path("/users/edit", id),
    view: (id: string) => path("/users/view", id),
  },
  category: {
    Label: "Category",
    list: "/category",
    add: "/category/add",
    editPath: "/category/edit/:id",
    viewPath: "/category/view/:id",
    edit: (id: string) => path("/category/edit", id),
    view: (id: string) => path("/category/view", id),
  },
  expenses: {
    Label: "Expenses",
    list: "/expenses",
    add: "/expenses/add",
    editPath: "/expenses/edit/:id",
    viewPath: "/expenses/view/:id",
    edit: (id: string) => path("/expenses/edit", id),
    view: (id: string) => path("/expenses/view", id),
  },
};

export default APP_PATH;

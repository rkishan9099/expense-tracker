import { path } from "../lib/utils";

const API_END_POINTS = {
  users: {
    get: "/user",
    add:"/user",
    details:(id: string) => path("/user", id),
    edit: (id: string) => path("/user", id),
    delete: (id: string) => path("/user", id)
  },
  category:{
    get:'/category',
    add:"/category",
    details:(id: string) => path("/category", id),
    edit: (id: string) => path("/category", id),
    delete: (id: string) => path("/category", id)
  },
  expenses:{
    get:"/expense",
    add:"/expense",
    details:(id: string) => path("/expense", id),
    edit: (id: string) => path("/expense", id),
    delete: (id: string) => path("/expense", id)
  },
  statistic:{
    get1:"/statistic/one",
    get2:"/statistic/two",
    get3:"/statistic/three"
  }
};

export default API_END_POINTS;

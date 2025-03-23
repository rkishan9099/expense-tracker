import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Routes from './routes/router';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(Routes)

function App() {
  return (
   <>
   <Provider store={store}>


   <RouterProvider router={router}/>
   </Provider>
   <Toaster />

   </>
  );
}

export default App;

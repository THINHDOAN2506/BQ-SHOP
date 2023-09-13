import "antd/dist/reset.css";
import "./app.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { ROUTES } from "./constants/router";
import MainLayout from "./layout";
import HomePage from "./pages/HomePage";
import ShowRooms from "./pages/ShowRooms";
import UserInformation from "./pages/UserInformation";
import EditUserInformation from "./pages/EditUserInformation";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CheckOutPage from "./pages/CheckoutPage";
import ShoppingComplete from "./pages/ShoppingComplete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CHECKOUT_PAGE} element={<CheckOutPage />} />
            <Route
              path={ROUTES.SHOPPING_COMPLETE}
              element={<ShoppingComplete />}
            />
            <Route path={ROUTES.LOGIN_PAGE} element={<Login />} />
            <Route path={ROUTES.REGISTER_PAGE} element={<Register />} />
            <Route
              path={ROUTES.USERINFORMATION}
              element={<UserInformation />}
            />
            <Route
              path={ROUTES.EDITUSERINFORMATION}
              element={<EditUserInformation />}
            />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ROUTES.SHOW_ROOMS} element={<ShowRooms />} />
          </Route>
          <Route path={"/"} element={<Navigate to={ROUTES.HOME_PAGE} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

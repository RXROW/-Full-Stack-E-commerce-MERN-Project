import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetalis";
import CheckOut from "./components/CheckOut/CheckOut";
import OrderConfrmationPage from "./pages/OrderConfrmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./components/Admin/AdminLayout";
import { ThemeProvider } from "./context/ThemeContext";
import DashbourdHome from "./components/Admin/DashbourdHome";
import UsersList from "./components/Admin/UsersList";
import OrdersList from "./components/Admin/OrdersList";
import ProductsList from "./components/Admin/ProductsList";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<UserLayout />}>
          {/* Nested Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order-confirmation" element={<OrderConfrmationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrders />} />
        </Route>

        {/* Admin Layout */}
        <Route
          path="admin"
          element={
            <ThemeProvider>
              <AdminLayout />
            </ThemeProvider>
          }
        >
                    <Route path="dashbourd" element={<DashbourdHome/>} />
                    <Route path="users" element={<UsersList/>} />
                    <Route path="products" element={<ProductsList/>} />
                    <Route path="orders" element={<OrdersList/>} />

          {/* Admin Pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

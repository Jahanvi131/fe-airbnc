import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Trips from "../pages/Trips";
import Profile from "../pages/Profile";
import SingleProperty from "../pages/SingleProperty";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/property/:id" element={<SingleProperty />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/trips" element={<Trips />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
};

export default AppRoutes;

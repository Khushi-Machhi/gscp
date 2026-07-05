// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "@/components/site/Layout";
// import Home from "@/pages/Home";
// import Company from "@/pages/Company";
// import ProductsPage from "@/pages/Products";
// import ProductCategory from "@/pages/ProductCategory";
// import WhyUsPage from "@/pages/WhyUs";
// import ContactPage from "@/pages/Contact";
// import NotFound from "@/pages/NotFound";

// const SiteRoutes = () => (
//   <Routes>
//     <Route element={<Layout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/company" element={<Company />} />
//       <Route path="/products" element={<ProductsPage />} />
//       <Route path="/products/:slug" element={<ProductCategory />} />
//       <Route path="/why-us" element={<WhyUsPage />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/home" element={<Navigate to="/" replace />} />
//       <Route path="*" element={<NotFound />} />
//     </Route>
//   </Routes>
// );

// export default SiteRoutes;



import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import Company from "@/pages/Company";
import Admin from "@/pages/Admin";
import ProductsPage from "@/pages/Products";
import ProductCategory from "@/pages/ProductCategory";
import ProductDetail from "@/pages/ProductDetail";
import WhyUsPage from "@/pages/WhyUs";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const SiteRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<Company />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductCategory />} />
      <Route path="/products/:slug/:productSlug" element={<ProductDetail />} />
      <Route path="/why-us" element={<WhyUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default SiteRoutes;
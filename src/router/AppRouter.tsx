import { Route, Routes } from "react-router-dom"
import { ContactPage, HomePage, ProductPage, ProductsPage } from "../pages/public"
import { HomeLayout } from "../components/layouts"


export const AppRouter = () => {
  return (
    <Routes>

      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

    </Routes>
  )
}

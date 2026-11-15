import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipesList from "./pages/RecipesList";
import RecipeDetails from "./pages/RecipeDetails";
import LoginControlled from "./pages/login/LoginControlled";
import LoginUncontrolled from "./pages/login/LoginUncontrolled";
import LoginRhf from "./pages/login/LoginRhf";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<RecipesList />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
        <Route path="login/controlled" element={<LoginControlled />} />
        <Route path="login/uncontrolled" element={<LoginUncontrolled />} />
        <Route path="login/rhf" element={<LoginRhf />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

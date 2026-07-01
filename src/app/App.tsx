import { RouterProvider, createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { Platform } from "./pages/platform";
import { CarbonClub } from "./pages/carbon-club";
import { ImpactPassport } from "./pages/impact-passport";
import { CircularReturn } from "./pages/circular-return";
import { AIAssistant } from "./pages/ai-assistant";
import { About } from "./pages/about";
import { HowItWorks } from "./pages/how-it-works";
import { Articles } from "./pages/articles";
import { Contact } from "./pages/contact";
import { FAQ } from "./pages/faq";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { ProtectedRoute } from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "platform", element: <Platform /> },
      { path: "carbon-club", element: <CarbonClub /> },
      { path: "impact-passport", element: <ImpactPassport /> },
      { path: "circular-return", element: <CircularReturn /> },
      { path: "ai-assistant", element: <AIAssistant /> },
      { path: "about", element: <About /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "articles", element: <Articles /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
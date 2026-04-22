import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LandingPage01 from "./pages/LandingPage01";
import LandingPage02 from "./pages/LandingPage02";
import SearchPage from "./pages/SearchPage";
import Test from "./pages/Test";
import ErrorPage from "./pages/ErrorPage";
import WritePage from "./pages/WritePage";
import OAuthRedirect from "./pages/OAuthRedirect";
import FeedDetailPage from "./pages/FeedDetailPage";
import FullWidthLayout from "./layouts/FullWidthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "searchpage", element: <SearchPage /> },
          { path: "writepage", element: <WritePage /> },
        ],
      },
      { path: "login", element: <LandingPage01 /> },
      { path: "landing1", element: <LandingPage01 /> },
      { path: "landing2", element: <LandingPage02 /> },
      { path: "oauth2/redirect", element: <OAuthRedirect /> },
      { path: "test", element: <Test /> },
      { path: "errorpage", element: <ErrorPage /> },
    ],
  },
  {
    element: <FullWidthLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ path: "feed/:id", element: <FeedDetailPage /> }],
      },
    ],
  },
]);

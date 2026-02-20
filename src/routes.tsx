import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import LandingPage01 from "./pages/LandingPage01";
import LandingPage02 from "./pages/LandingPage02";
import SearchPage from "./pages/SearchPage";
import Test from "./pages/Test";
import ErrorPage from "./pages/ErrorPage";
import WritePage from "./pages/WritePage";
import OAuthRedirect from "./pages/OAuthRedirect";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true, // '/' 경로일 때 기본으로 보여줄 자식
          element: <HomePage />,
        },
        {
          path: "landing1",
          element: <LandingPage01 />,
        },
        {
          path: "login",
          element: <LandingPage01 />,
        },
        {
          path: "landing2",
          element: <LandingPage02 />,
        },
        {
          path: "searchpage",
          element: <SearchPage />,
        },
        {
          path: "test",
          element: <Test />,
        },
        {
          path: "errorpage",
          element: <ErrorPage />,
        },
        {
          path: "writepage",
          element: <WritePage />,
        },
        {
          path: "oauth2/redirect",
          element: <OAuthRedirect />,
        },
        // 다른 페이지도 여기에 추가 가능
      ],
    },
  ]);

  return routes;
};

export default Router;

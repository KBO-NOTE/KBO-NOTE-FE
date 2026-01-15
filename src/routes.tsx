import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import LandingPage01 from "./pages/LandingPage01";
import LandingPage02 from "./pages/LandingPage02";

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
        // 다른 페이지도 여기에 추가 가능
        { path: "landing1", element: <LandingPage01 /> },
        { path: "landing2", element: <LandingPage02 /> },
      ],
    },
  ]);

  return routes;
};

export default Router;

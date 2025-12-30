import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return elements;
}

/* Example
const elements = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      // 중첩 라우팅도 객체 구조로 직관적 표현 가능
      path: '/dashboard',
      element: <DashboardLayout />, // Outlet이 들어있는 레이아웃
      children: [
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <div>설정 페이지</div> },
      ],
    },
  ]);
 */

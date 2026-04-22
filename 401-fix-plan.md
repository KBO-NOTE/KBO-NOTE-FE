# 401 에러 처리 및 로그인 라우팅 수정 플랜

## Context

주니어가 작성한 코드에서 401 발생 시 `/login` 리다이렉트 로직에 여러 문제가 있음.  
핵심 원인은 세 가지:
① `instance.ts`의 401 처리 로직 자체 버그  
② interceptor에서 `window.location.href` 사용으로 SPA 구조 파괴  
③ `QueryClient`를 Singleton으로 쓰지 않아 설정과 캐시가 레이아웃마다 분리됨

---

## 문제 목록

### 🔴 P0 — `instance.ts` 401 처리 로직 버그 4개

**파일**: `src/api/instance.ts`

**버그 1** — `isRefreshRequest || alreadyRetried`인 경우 그냥 401 response를 return

React Query는 이걸 성공으로 인식하고, 사용자는 로그인 페이지로 이동하지 않은 채 에러 상태에 방치됨.

```ts
if (isRefreshRequest || alreadyRetried) {
  return response; // ← 토큰 제거 + 로그인 이동이 없음
}
```

**버그 2** — `newAccessToken`이 없어도 그냥 401 response를 return

```ts
if (!newAccessToken) {
  return response; // ← 동일하게 에러 처리 누락
}
```

**버그 3** — refreshToken 없을 때는 `/login`, catch에서는 `/login?error=true` → 불일치  
두 곳 모두 `/login?error=true`로 통일 필요

**버그 4** — `console.log("a")`, `console.log("b")`, `console.log("c")` 미제거

---

### 🔴 P1 — `window.location.href` 사용 (SPA 구조 파괴)

**파일**: `src/api/instance.ts`, `src/api/axios.ts`

두 파일 모두 `window.location.href = "/login?error=true"` 사용.  
이는 **hard reload**를 발생시켜 React 상태, QueryClient 캐시, 네비게이션 스택을 전부 초기화함.

**원인**: interceptor는 React 컴포넌트 밖이라 `useNavigate()` 사용 불가.

**해결**: `BrowserRouter` → `createBrowserRouter` 마이그레이션

- 라우터 객체를 모듈로 분리 export
- interceptor에서 `router.navigate('/login?error=true', { replace: true })` 호출
- SPA 방식으로 처리되어 hard reload 없음

```ts
// src/router.ts
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([...]);

// src/api/instance.ts
import { router } from '../router';
// ...
router.navigate('/login?error=true', { replace: true });
```

---

### 🟡 P2 — QueryClient Singleton 미적용

**파일**: `src/App.tsx` (line 11), `src/layouts/FullWidthLayout.tsx` (line 8)

두 파일 모두 `new QueryClient()`로 새 인스턴스를 생성.

- `src/api/queryClient.ts`에 정의한 `retry: 1`, `staleTime: 30s` 설정이 아예 적용되지 않음
- `App` 레이아웃과 `FullWidthLayout` 사이에 캐시 공유 안됨

```ts
// 수정 전 (각 파일에서 따로 생성)
const queryClient = new QueryClient();

// 수정 후
import { queryClient } from '../api/queryClient';
```

---

### 🟡 P3 — ProtectedRoute 부재

**파일**: `src/routes.tsx`

`/`, `/searchpage`, `/writepage` 등 인증이 필요한 페이지에 토큰 체크가 없음.  
토큰 없이 직접 접근해도 `/login`으로 이동하지 않고 API 호출만 실패함.

**해결**: `ProtectedRoute` 컴포넌트 추가

```tsx
// src/components/ProtectedRoute.tsx
const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};
```

---

## 수정 순서

| 순서 | 파일 | 작업 |
|------|------|------|
| 1 | `src/router.ts` | 신규 생성 — 라우트 배열 + `createBrowserRouter` export |
| 2 | `src/main.tsx` | `BrowserRouter` + `<Router />` → `RouterProvider` |
| 3 | `src/api/instance.ts` | 버그 4개 수정 + `router.navigate()` 적용 |
| 4 | `src/api/axios.ts` | `window.location.href` → `router.navigate()` 적용 |
| 5 | `src/App.tsx` | QueryClient singleton 적용 |
| 6 | `src/layouts/FullWidthLayout.tsx` | QueryClient singleton 적용 |
| 7 | `src/components/ProtectedRoute.tsx` | 신규 생성 — 인증 가드 |
| 8 | `src/router.ts` | 보호 대상 라우트에 ProtectedRoute 적용 |

---

## 수정 후 401 처리 흐름

```
API 요청 → 401 응답
  ├─ refreshToken 없음
  │    → 토큰 제거 → router.navigate('/login?error=true', { replace: true })
  ├─ refresh 요청이거나 이미 재시도
  │    → 토큰 제거 → router.navigate('/login?error=true', { replace: true })
  └─ refreshToken 있음 → getFreshAccessToken()
       ├─ 성공 → 새 토큰으로 원래 요청 재시도
       └─ 실패 (newAccessToken 없음 or throw)
            → 토큰 제거 → router.navigate('/login?error=true', { replace: true })
```

모든 분기에서 로그인 페이지 이동 보장, hard reload 없음.

---

## 검증

1. accessToken 삭제 후 API 호출 → `/login?error=true`로 SPA navigate (새로고침 없음) 확인
2. accessToken 만료, refreshToken 유효 → 자동 refresh 후 원 요청 재시도 확인
3. 두 토큰 모두 만료 → `/login?error=true` 이동 확인
4. 토큰 없이 `/` 직접 접근 → `/login` redirect 확인
5. `FeedDetailPage` ↔ `HomePage` 캐시 공유 확인 (QueryClient singleton)

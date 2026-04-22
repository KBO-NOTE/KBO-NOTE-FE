// 1. Cloudflare 환경 변수 타입 정의
interface Env {
  VITE_API_BASE_URL: string;
  VITE_GOOGLE_OAUTH_BASE_URL: string;
  ASSETS: { fetch: typeof fetch }; // 정적 자산 바인딩
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // [A] API 요청 처리 (/api/v1/...)
    if (url.pathname.startsWith("/api/")) {
      // 대시보드에 입력한 VITE_API_BASE_URL 사용
      const targetUrl = `${env.VITE_API_BASE_URL}${url.pathname}${url.search}`;

      // 실제 서버로 요청 전달 (Proxy)
      const newRequest = new Request(targetUrl, request);
      return fetch(newRequest);
    }

    // [B] (선택사항) OAuth 관련 요청 처리
    // 만약 프런트엔드에서 /oauth/... 로 호출하는 로직이 있다면 아래 주석을 해제하세요.
    /*
    if (url.pathname.startsWith("/oauth/")) {
      const targetUrl = `${env.VITE_GOOGLE_OAUTH_BASE_URL}${url.pathname}${url.search}`;
      return fetch(new Request(targetUrl, request));
    }
    */

    // [C] 그 외 모든 요청 (HTML, JS, CSS, 이미지)
    // dist 폴더에 있는 파일을 브라우저에 보여줍니다.
    return env.ASSETS.fetch(request);
  },
};

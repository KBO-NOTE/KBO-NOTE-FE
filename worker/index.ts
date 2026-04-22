// 1. Cloudflare 환경 변수 타입 정의
interface Env {
  VITE_API_BASE_URL: string;
  VITE_GOOGLE_OAUTH_BASE_URL: string;
  ASSETS: { fetch: typeof fetch }; // 정적 자산 바인딩
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      // 1. 변수가 들어왔는지 체크
      if (!env.VITE_API_BASE_URL) {
        return new Response(
          JSON.stringify({
            error: "환경 변수 누락",
            detail: "VITE_API_BASE_URL이 설정되지 않았습니다. 대시보드의 Preview 환경 설정을 확인하세요.",
            available_keys: Object.keys(env) // 현재 Worker가 알고 있는 변수 목록 출력
          }), 
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      try {
        const targetUrl = `${env.VITE_API_BASE_URL}${url.pathname}${url.search}`;
        
        // 2. URL 객체 생성 시도 (형식이 잘못되면 여기서 에러 발생)
        const proxyUrl = new URL(targetUrl);

        const newRequest = new Request(proxyUrl.toString(), {
          method: request.method,
          headers: request.headers,
          body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
          redirect: "follow"
        });
        
        return await fetch(newRequest);
      } catch (err: any) {
        return new Response(`Proxy Error: ${err.message}`, { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import api from '../api/instance'; 
 
const OAuthRedirect = () => { 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    const handleRedirect = async () => { 
      const params = new URLSearchParams(window.location.search); 
      const accessToken = params.get('accessToken'); 
      const refreshToken = params.get('refreshToken'); 
 
      if (!accessToken) { 
        navigate('/login?error=true', { replace: true }); 
        return; 
      } 
 
      localStorage.setItem('accessToken', accessToken); 
      localStorage.setItem('refreshToken', refreshToken ?? ''); 
 
      try { 
        const favorites = (await api.get('v1/favorites').json()) as { playerIds: number[] }; 
        navigate(favorites.playerIds.length > 0 ? '/' : '/landing2', { replace: true }); 
      } catch { 
        navigate('/landing2', { replace: true }); 
      } 
    }; 
 
    void handleRedirect(); 
  }, [navigate]); 
 
  return <div>로그인 처리 중...</div>; 
}; 
 
export default OAuthRedirect;

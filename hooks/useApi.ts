import { useSession } from 'next-auth/react';

export const useApi = () => {
  const { data: session } = useSession();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchApi = async (apiRoute: string, options: RequestInit = {}) => {
    // console.log(session?.user.jwt);
    if (!session?.user?.jwt) {
      throw new Error('No JWT token found');
    }

    const url = `${baseUrl}/api${apiRoute}`;

    // 헤더 설정
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${session.user.jwt}`);
    headers.set('Content-Type', 'application/json');

    // 요청 실행
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 응답 체크
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  };

  return { fetchApi };
};

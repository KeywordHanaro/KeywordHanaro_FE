'use server';

import { auth } from '@/lib/auth';

export async function fetchData(
  apiRoute: string,
  method: string = 'GET',
  body?: Record<string, unknown>
) {
  // 서버 세션 가져오기
  const session = await auth();

  // 인증 체크
  if (!session?.user?.jwt) {
    throw new Error('Not authenticated');
  }

  // API 기본 URL 설정
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/be${apiRoute}`;

  // 요청 헤더 설정
  const headers: HeadersInit = {
    Authorization: `Bearer ${session.user.jwt}`,
    'Content-Type': 'application/json',
  };

  // 요청 옵션 설정
  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  // API 호출
  const response = await fetch(url, options);

  // 응답 체크
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GetKakao() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const url = 'http://localhost:8080/api/resource';
        const code = searchParams.get('code');
        if (code === null) {
          throw new Error('code is null');
        }
        const params = new URLSearchParams({
          code: code,
        });
        // GET 요청
        const response = await fetch(`${url}?${params}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (!!searchParams.get('code') !== null) {
      fetchCode();
    }
  }, [searchParams]);

  // const openKakaoLogin = () => {
  //   window.open(
  //     `${kakao_auth_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  //   );
  // };
  const selectFrients = () => {
    router.push('/');
  };

  if (data === null) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <>
        <div>
          <button onClick={selectFrients}>친구 선택</button>
        </div>
      </>
    );
  }
}

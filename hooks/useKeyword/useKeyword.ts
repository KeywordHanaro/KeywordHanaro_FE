// hooks/useKeywordApi.ts
import { KeywordDetail } from '@/data/keyword';
import { useApi } from '@/hooks/useApi';

export const useKeywordApi = () => {
  const { fetchApi } = useApi();

  const getKeywordById = async (id: number): Promise<KeywordDetail> => {
    const response = await fetchApi(`/keywords/${id}`);
    return response;
  };

  

  const createKeyword = async (keyword: string) => {
    return await fetchApi('/keywords', {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    });
  };

  const updateKeyword = async (id: number, keyword: string) => {
    return await fetchApi(`/keywords/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ keyword }),
    });
  };

  const deleteKeyword = async (id: number) => {
    return await fetchApi(`/keywords/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    getKeywordById,
    createKeyword,
    updateKeyword,
    deleteKeyword,
  };
};

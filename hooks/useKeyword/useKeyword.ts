// hooks/useKeywordApi.ts
import { KeywordDetail } from '@/data/keyword';
import { useApi } from '@/hooks/useApi';
import { CreateKeywordRequest } from '@/types/Keyword';

export const useKeywordApi = () => {
  const { fetchApi } = useApi();

  const getKeywordById = async (id: number): Promise<KeywordDetail> => {
    const response = await fetchApi(`/keyword/${id}`);
    return response;
  };

  const createKeyword = async (keyword: CreateKeywordRequest) => {
    return await fetchApi('/keyword', {
      method: 'POST',
      body: JSON.stringify({ ...keyword }),
    });
  };

  const updateKeyword = async (id: number, keyword: string) => {
    return await fetchApi(`/keyword/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ keyword }),
    });
  };

  const deleteKeyword = async (id: number) => {
    return await fetchApi(`/keyword/${id}`, {
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

// hooks/useKeywordApi.ts
// import { KeywordDetail } from '@/data/keyword';
import { useApi } from '@/hooks/useApi';
import { CreateKeywordRequest, UseKeywordResponse } from '@/types/Keyword';

export const useKeywordApi = () => {
  const { fetchApi } = useApi();

  const getAllKeywords = async (): Promise<UseKeywordResponse[]> => {
    const response = await fetchApi('/keyword');
    return response;
  };

  // 임시로 키워드 응답을 추가
  const getKeywordById = async (id: number): Promise<UseKeywordResponse> => {
    const response = await fetchApi(`/keyword/${id}`);
    return response;
  };

  const createKeyword = async (keyword: CreateKeywordRequest) => {
    const processedKeyword = stringifyBranchIfNeeded(keyword);
    return await fetchApi('/keyword', {
      method: 'POST',
      body: JSON.stringify(processedKeyword),
    });
  };

  const updateKeyword = async (id: number, keyword: CreateKeywordRequest) => {
    const processedKeyword = stringifyBranchIfNeeded(keyword);
    return await fetchApi(`/keyword/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(processedKeyword),
    });
  };

  const deleteKeyword = async (id: number) => {
    return await fetchApi(`/keyword/${id}`, {
      method: 'DELETE',
    });
  };

  // Utility function to handle stringification
  const stringifyBranchIfNeeded = (keyword: CreateKeywordRequest) => {
    if (keyword.type === 'TICKET') {
      return {
        ...keyword,
        branch: JSON.stringify(keyword.branch),
      };
    }
    return keyword;
  };

  const updateFavorite = async ({
    id,
    favorite,
  }: {
    id: number;
    favorite: boolean;
  }) => {
    return await fetchApi(`/keyword/isFavorite/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(favorite),
    });
  };

  return {
    getAllKeywords,
    getKeywordById,
    createKeyword,
    updateKeyword,
    deleteKeyword,
    updateFavorite,
  };
};

// hooks/useKeywordApi.ts
import { KeywordDetail } from '@/data/keyword';
import { useApi } from '@/hooks/useApi';
import { CreateKeywordRequest, UseKeywordResponse } from '@/types/Keyword';

export const useKeywordApi = () => {
  const { fetchApi } = useApi();

  const getAllKeywords = async (): Promise<UseKeywordResponse[]> => {
    const response = await fetchApi('/keyword');
    return response;
  };

  const getKeywordById = async (id: number): Promise<KeywordDetail> => {
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

  return {
    getAllKeywords,
    getKeywordById,
    createKeyword,
    updateKeyword,
    deleteKeyword,
  };
};

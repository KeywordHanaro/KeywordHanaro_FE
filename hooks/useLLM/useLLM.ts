import { useApi } from '@/hooks/useApi';
import { answer, info, query } from '@/types/LLM';

export const useLLMApi = () => {
  const { fetchApi } = useApi();

  const getInfo = async (): Promise<info> => {
    return await fetchApi('/llm/getInfo');
  };
  const chat = async (chat: query): Promise<answer> => {
    return await fetchApi('/llm/chat', {
      method: 'POST',
      body: JSON.stringify(chat),
    });
  };

  return { getInfo, chat };
};

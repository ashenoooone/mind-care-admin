import { useMutation } from '@tanstack/react-query';
import { AiService } from './api';

export const useGetAiHints = () => {
  return useMutation({
    mutationFn: AiService.getAiHints,
  });
};

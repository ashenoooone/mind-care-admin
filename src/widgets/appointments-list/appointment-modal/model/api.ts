import { $api } from '@/shared/api';
import { AiHints } from '../domain';
export class AiService {
  static async getAiHints({ userId }: { userId: number }) {
    return $api.post<AiHints>('/hints', {
      userId,
    });
  }
}

import { Button } from '@/shared/ui/button';
import { List, ListItem } from '@/shared/ui/list';
import { SparklesIcon } from 'lucide-react';

type Props = {
  onGenerateHintsClick?: () => void;
};

export const AiSection = (props: Props) => {
  const { onGenerateHintsClick } = props;

  return (
    <List
      title={
        'AI Советы к этой записи на основе Ваших заметок'
      }
    >
      <ListItem>
        <Button
          onClick={onGenerateHintsClick}
          className="relative overflow-hidden text-white border-none rounded-lg shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient"></div>
          <div className="relative flex items-center gap-2 z-10">
            <SparklesIcon className="w-4 h-4" />
            Сгенерировать советы
          </div>
        </Button>
      </ListItem>
    </List>
  );
};

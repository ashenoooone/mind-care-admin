import { Button } from '@/shared/ui/button';
import { Save } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
type Props = {
  className?: string;
  onSubmit: (note: string) => void;
  initialNote?: string;
  isLoading?: boolean;
};

export const EditNote = (props: Props) => {
  const {
    className,
    onSubmit,
    initialNote = '',
    isLoading,
  } = props;

  const [note, setNote] = useState<string>();

  return (
    <div className={className}>
      <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
        Добавить заметку к текущей записи
      </h2>
      <Button
        onClick={() => onSubmit(note ?? initialNote)}
        variant="outline"
        size="sm"
        isLoading={isLoading}
      >
        <Save className="h-4 w-4" />
        Сохранить
      </Button>
      <div className="mt-4">
        <MDEditor
          data-color-mode="light"
          value={note ?? initialNote}
          onChange={setNote}
        />
      </div>
    </div>
  );
};

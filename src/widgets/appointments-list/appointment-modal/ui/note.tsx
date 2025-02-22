import MDEditor from '@uiw/react-md-editor';
import { Note as TNote } from '../domain';

type Props = {
  className?: string;
  note: TNote;
};

export const Note = (props: Props) => {
  const { className, note } = props;
  return (
    <div className={className}>
      <p className="text-lg font-bold">
        {note.serviceName}
      </p>
      <p className="text-sm">{note.appointmentDate}</p>
      <div className="prose prose-sm max-w-none select-none">
        <MDEditor.Markdown
          source={note.note}
          wrapperElement={{ 'data-color-mode': 'light' }}
        />
      </div>
    </div>
  );
};

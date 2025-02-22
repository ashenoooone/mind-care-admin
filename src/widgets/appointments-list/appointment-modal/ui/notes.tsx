import { Card, CardContent } from '@/shared/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/carousel';
import { Note } from '../domain';

type Props = {
  className?: string;
  notes: Note[];
  renderNote: (note: Note) => React.ReactNode;
};

export const Notes = (props: Props) => {
  const { className, notes, renderNote } = props;
  return (
    <div className={className}>
      <h2 className="mb-4 text-lg font-semibold">
        История заметок
      </h2>
      <Carousel>
        <CarouselContent>
          {notes.map((note) => (
            <CarouselItem
              className="basis-1/2"
              key={note.appointmentDate}
            >
              <Card>
                <CardContent>
                  {renderNote(note)}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

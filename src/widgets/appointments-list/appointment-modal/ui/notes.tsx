import { Card, CardContent } from '@/shared/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/carousel';
import { Note } from '../domain';

import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
  className?: string;
  notes: Note[];
  renderNote: (note: Note) => React.ReactNode;
  isLoading: boolean;
};

export const Notes = (props: Props) => {
  const { className, notes, renderNote, isLoading } = props;
  return (
    <div className={className}>
      <h2 className="mb-4 text-lg font-semibold">
        История заметок
      </h2>
      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : (
        <Carousel>
          <CarouselContent className="items-stretch">
            {notes.map((note) => (
              <CarouselItem
                className="basis-1/2 h-full"
                key={note.appointmentDate}
              >
                <Card className="h-full">
                  <CardContent className="h-full">
                    {renderNote(note)}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

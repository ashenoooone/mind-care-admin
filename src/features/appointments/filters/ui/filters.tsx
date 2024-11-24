import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Input } from '@/shared/ui/input';
import { ReactNode, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { createAppointmentsFiltersModel } from '../model/model';
import { useUnit } from 'effector-react';

type Props = {
  className?: string;
  model: ReturnType<typeof createAppointmentsFiltersModel>;
  clientsSearch: ReactNode;
  servicesSearch: ReactNode;
};

export const Filters = (props: Props) => {
  const {
    className,
    model,
    clientsSearch,
    servicesSearch,
  } = props;

  const [filters] = useUnit(model.filters);

  const [isOpen, setIsOpen] = useState<
    string[] | undefined
  >(['item']);

  return (
    <Accordion
      type="multiple"
      className={cn(className, 'w-full')}
      value={isOpen ? isOpen : undefined}
      onValueChange={(value) => setIsOpen(value)}
    >
      <AccordionItem value={'item'}>
        <AccordionTrigger>Фильтры поиска</AccordionTrigger>
        <AccordionContent className="p-2 flex gap-4 flex-col">
          <div className="flex gap-2">
            {clientsSearch}
            {servicesSearch}
          </div>
          <div className="flex flex-col gap-4">
            <Input
              type="date"
              label="Дата"
              value={filters.date?.toLocaleDateString()}
            />
            <div className="flex gap-2">
              <Input
                label="Дата с"
                type="date"
                value={filters.dateFrom?.toLocaleDateString()}
              />
              <Input
                label="Дата по"
                type="date"
                value={filters.dateTo?.toLocaleDateString()}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

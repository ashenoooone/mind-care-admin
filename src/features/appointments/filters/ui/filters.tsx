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

  const fromDate =
    filters?.dateFrom?.toISOString().split('T')[0] ?? '';
  const toDate =
    filters.dateTo?.toISOString().split('T')[0] ?? '';
  const date =
    filters.date?.toISOString().split('T')[0] ?? '';

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
              value={date}
              onChange={(e) =>
                model.actions.setDateEv(
                  e.target.value
                    ? new Date(e.target.value)
                    : null
                )
              }
            />
            <div className="flex gap-2">
              <Input
                label="Дата с"
                type="date"
                value={fromDate}
                onChange={(e) =>
                  model.actions.setDateFromEv(
                    e.target.value
                      ? new Date(e.target.value)
                      : null
                  )
                }
              />
              <Input
                label="Дата по"
                type="date"
                value={toDate}
                onChange={(e) =>
                  model.actions.setDateToEv(
                    e.target.value
                      ? new Date(e.target.value)
                      : null
                  )
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

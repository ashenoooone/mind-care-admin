'use client';

import { useUnit } from 'effector-react';
import { createUsersFiltersModel } from '../model/filters.model';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  model: ReturnType<typeof createUsersFiltersModel>;
};

export const UsersFilters = (props: Props) => {
  const { className, model } = props;

  const [name, telegramNickname, phoneNumber] = useUnit([
    model.$name,
    model.$telegramNickname,
    model.$phoneNumber,
  ]);

  const [isOpen, setIsOpen] = useState<
    string[] | undefined
  >(['item']);

  return (
    <Accordion
      type="multiple"
      className={cn(className, 'w-full')}
      value={isOpen}
      onValueChange={(value) => setIsOpen(value)}
    >
      <AccordionItem value="item">
        <AccordionTrigger>Фильтры поиска</AccordionTrigger>
        <AccordionContent className="p-2 flex gap-4 flex-col">
          <div className="flex gap-2">
            <Input
              label="Имя пользователя"
              value={name}
              onChange={(e) =>
                model.actions.setNameEv(e.target.value)
              }
              placeholder="Введите имя пользователя"
            />
            <Input
              label="Telegram никнейм"
              value={telegramNickname}
              onChange={(e) =>
                model.actions.setTelegramNicknameEv(
                  e.target.value
                )
              }
              placeholder="Введите никнейм"
            />
            <Input
              label="Номер телефона"
              value={phoneNumber}
              onChange={(e) =>
                model.actions.setPhoneNumberEv(
                  e.target.value
                )
              }
              placeholder="Введите номер телефона"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

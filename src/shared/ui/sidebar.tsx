'use client';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';
import {
  Briefcase,
  Calendar,
  LogOut,
  Settings,
  Sidebar as SidebarIcon,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '../config/router-config';

type SidebarProps = {
  className?: string;
};

const NAV_ITEMS = [
  {
    text: 'Клиенты',
    icon: <Users />,
    href: ROUTES.users,
  },
  {
    text: 'Записи',
    icon: <Calendar />,
    href: ROUTES.records,
  },
  {
    text: 'Услуги',
    icon: <Briefcase />,
    href: ROUTES.services,
  },
  {
    text: 'Настройки',
    icon: <Settings />,
    href: ROUTES.settings,
  },
];

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        'w-10 bg-gray-200/70 transition-all border-r-2 min-h-screen p-2 flex flex-col',
        className,
        {
          'w-40': isOpen,
        }
      )}
    >
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1 mb-4"
        variant={'ghost'}
      >
        <SidebarIcon />
      </Button>
      <div className="flex flex-col gap-1 items-start h-full">
        {NAV_ITEMS.map((item) => (
          <Button
            className="w-full justify-start"
            key={item.text}
            variant={'ghost'}
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              <span
                className={cn(
                  'opacity-0 invisible transition-all',
                  {
                    'opacity-100 visible': isOpen,
                  }
                )}
              >
                {item.text}
              </span>
            </Link>
          </Button>
        ))}
        <Button
          className="w-full mt-auto"
          size={'sm'}
          variant={'destructive'}
        >
          {isOpen ? 'Выйти' : <LogOut />}
        </Button>
      </div>
    </nav>
  );
};

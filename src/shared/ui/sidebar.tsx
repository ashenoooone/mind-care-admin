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
  MessageCircleQuestion,
  StickyNote,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '../config/router-config';
import { handleLogout } from '../api/utils';
import { usePathname } from 'next/navigation';

type SidebarProps = {
  className?: string;
};

const NAV_ITEMS = [
  {
    text: 'Клиенты',
    icon: <Users />,
    href: ROUTES.users,
    id: 'users',
  },
  {
    text: 'Записи',
    icon: <Calendar />,
    href: ROUTES.appointments,
    id: 'appointments',
  },
  {
    text: 'Услуги',
    icon: <Briefcase />,
    href: ROUTES.services,
    id: 'services',
  },
  {
    text: 'Настройки',
    icon: <Settings />,
    href: ROUTES.settings,
    id: 'settings',
  },
  {
    text: 'Обращения',
    icon: <MessageCircleQuestion />,
    href: ROUTES.reports,
    id: 'reports',
  },
  {
    text: 'Отчеты',
    icon: <StickyNote />,
    href: ROUTES.metrics,
    id: 'metrics',
  },
];

export const SIDEBAR_COOKIE_NAME = 'sidebar_open';

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  return (
    <nav
      className={cn(
        'bg-gray-100 transition-all shrink-0 relative border-r-2 min-h-screen flex flex-col z-50',
        className,
        {
          'w-sidebar_open': isOpen,
          'w-sidebar_closed': !isOpen,
        }
      )}
    >
      <div
        className={cn(
          'fixed transition-all min-h-screen p-2 flex flex-col z-50',
          {
            'w-sidebar_open': isOpen,
            'w-sidebar_closed': !isOpen,
          }
        )}
      >
        <Button
          onClick={toggleSidebar}
          className="p-1 mb-4 bg-gray-400/30 hover:opacity-80 transition-all"
          variant={'ghost'}
        >
          <SidebarIcon />
        </Button>
        <div className="flex flex-col gap-1 items-start h-full">
          {NAV_ITEMS.map((item) => (
            <Button
              title={item.text}
              className={cn('w-full justify-start', {
                'text-blue-500': pathname === item.href,
              })}
              key={item.text}
              variant={'ghost'}
              data-testid={item.id}
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
            className="w-full"
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleLogout()}
          >
            {isOpen ? (
              'Выйти'
            ) : (
              <LogOut className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

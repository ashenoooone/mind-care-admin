import React from 'react';
import { WithPaginationMeta } from '../types';
import { Button } from './button';
import { cn } from '../lib/utils';

type PaginationProps = {
  meta: WithPaginationMeta['meta'];
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
}) => {
  const { currentPage, totalPages } = meta;
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > maxVisiblePages + 1) {
        pages.push('...');
      }

      const startPage = Math.max(
        2,
        currentPage - maxVisiblePages
      );
      const endPage = Math.min(
        totalPages - 1,
        currentPage + maxVisiblePages
      );

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - maxVisiblePages) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  const handlePageChange = (page: number) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 p-4 bg-gray-100 rounded-lg">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={meta.currentPage === meta.prevPage}
        className={cn('shrink-0 px-2')}
      >
        Предыдущая
      </Button>

      {pages.map((page, index) => (
        <Button
          key={index}
          variant={'ghost'}
          className={cn('shrink-0 px-2')}
          onClick={() =>
            typeof page === 'number' &&
            handlePageChange(page)
          }
          disabled={typeof page !== 'number'}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={meta.nextPage === meta.currentPage}
        className={cn('shrink-0 px-2')}
      >
        Следующая
      </Button>
    </div>
  );
};

export default Pagination;

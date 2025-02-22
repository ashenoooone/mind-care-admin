import { cn } from '../lib/utils';
import { LinkProps as NLinkProps } from 'next/link';
import NLink from 'next/link';
import { ReactNode, useState } from 'react';

type ChildrenParams = { hovered: boolean };

type ChildrenLinkProps =
  | ((params: ChildrenParams) => ReactNode)
  | ReactNode;

type LinkProps = {
  className?: string;
  children?: ChildrenLinkProps;
} & NLinkProps &
  Omit<React.ComponentProps<'a'>, 'children'>;

export const Link = (props: LinkProps) => {
  const { className, children, ...rest } = props;
  const [hovered, setHovered] = useState(false);

  let content: ReactNode | null = null;

  if (typeof children === 'function') {
    content = children({ hovered });
  } else {
    content = children;
  }

  return (
    <NLink
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative transition-all hover:-translate-y-0.5 hover:text-blue-500 hover:underline hover:decoration-wavy hover:underline-offset-4 px-1',
        className
      )}
      {...rest}
    >
      {content}
    </NLink>
  );
};

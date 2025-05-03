type Props = {
  header: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  columns: React.ReactNode;
  modals: React.ReactNode;
};

export const TableLayout = (props: Props) => {
  const { header, title, content, columns, modals } = props;

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <header className="sticky top-0 z-50 bg-background py-2">
        <div className="relative after:absolute after:top-full after:left-0 after:w-full after:h-10 after:bg-gradient-to-b after:from-background after:to-transparent">
          {header}
          {title}
          {columns}
        </div>
      </header>
      <div className="flex flex-col gap-4">{content}</div>
      {modals}
    </div>
  );
};

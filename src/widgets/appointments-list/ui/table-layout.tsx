type Props = {
  header: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
};

export const TableLayout = (props: Props) => {
  const { header, title, content } = props;

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <header className="sticky top-0 z-10 bg-background">
        {header}
        {title}
      </header>
      <div className="flex flex-col gap-4 ">{content}</div>
    </div>
  );
};

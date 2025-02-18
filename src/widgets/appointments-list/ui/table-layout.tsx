type Props = {
  header: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
};

export const TableLayout = (props: Props) => {
  const { header, title, content } = props;

  return (
    <div className={'flex flex-col'}>
      <header>{header}</header>
      <div className={'flex flex-col'}>
        {title}
        {content}
      </div>
    </div>
  );
};

type Props = {
  className?: string;
};

export const TableColumn = (props: Props) => {
  const { className } = props;
  return <div className={className}></div>;
};

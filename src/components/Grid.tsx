type numOfColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  children: React.ReactNode;
  columns?: numOfColumns;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: numOfColumns;
  md?: numOfColumns;
  sm?: numOfColumns;
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  start?: numOfColumns;
}

const Grid = ({ children, columns = 12 }: GridProps) => {
  return <div className={`grid grid--${columns}`}>{children}</div>;
};

const Item = ({
  span = 6,
  md = 6,
  sm = 6,
  alignSelf = 'center',
  justifySelf = 'stretch',
  start = 1,
  children,
}: GridItemProps) => {
  return (
    <div
      className={`grid-item grid-item__span__${span}__start__${start} grid-item__span__${md}__start__${start}--tablet grid-item__span__${sm}__start__${start}--mobile grid-item__align__${alignSelf} grid-item__justify__${justifySelf}`}
    >
      {children}
    </div>
  );
};

Grid.Item = Item;

export default Grid;

import { useState } from 'react';
import { createPortal } from 'react-dom';
import TrashIcon from '@/components/display/icons/Trash';
import FilterIcon from '@/components/display/icons/Filter';
import SortIcon from '@/components/display/icons/Sort';

interface ListToolbarItemProps {
  children: string;
  type: 'delete' | 'filter' | 'sort';
  options?: Array<React.ReactNode>;
}

const ListToolbarItem = ({ children, type, options }: ListToolbarItemProps) => {
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [openModalChoice, setOpenModalChoice] = useState(false);

  const isSort = type === 'sort';
  const isFilter = type === 'filter';
  const isDelete = type === 'delete';

  const handleClick = () => {
    if (isSort || isFilter) setOpenModalOptions((prev) => !prev);
    else setOpenModalChoice((prev) => !prev);
  };

  return (
    <div className="c-list-toolbar__item">
      <button onClick={handleClick} className="c-list-toolbar__item__btn">
        {isDelete && <TrashIcon />}
        {isFilter && <FilterIcon />}
        {isSort && <SortIcon />}
        {children}
      </button>
      {(isSort || isFilter) && openModalOptions && (
        <div className="c-list-toolbar__item__options">
          {isSort && <span>Sort by</span>}
          {isFilter && <span>Filter by</span>}
          <ul>
            {options?.map((op) => (
              <li>{op}</li>
            ))}
          </ul>
        </div>
      )}
      {isDelete &&
        openModalChoice &&
        createPortal(<div>Oi, tudo bom</div>, document.getElementById('root')!)}
    </div>
  );
};

interface ListToolbarProps {
  children: React.ReactNode;
}

const ListToolbar = ({ children }: ListToolbarProps) => {
  return <div className="c-list-toolbar">{children}</div>;
};

ListToolbar.Item = ListToolbarItem;

export default ListToolbar;

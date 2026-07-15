import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import TrashIcon from '@/components/display/icons/Trash';
import FilterIcon from '@/components/display/icons/Filter';
import SortIcon from '@/components/display/icons/Sort';
import DynamicModal from '@/components/display/DynamicModal';
import { autoPlacement, autoUpdate, useFloating } from '@floating-ui/react-dom';

interface ListToolbarItemProps {
  children: React.ReactNode;
  type: 'delete' | 'filter' | 'sort';
  currentActive: string;
}

const ListToolbarItem = ({
  children,
  type,
  currentActive,
}: ListToolbarItemProps) => {
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [openModalChoice, setOpenModalChoice] = useState(false);

  const isSort = type === 'sort';
  const isFilter = type === 'filter';
  const isDelete = type === 'delete';

  const handleClick = () => {
    if (isSort || isFilter) setOpenModalOptions((prev) => !prev);
    else setOpenModalChoice((prev) => !prev);
  };

  const { refs } = useFloating({
    open: openModalOptions,
    middleware: [autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div className="c-list-toolbar__item-wrapper">
      <div className="c-list-toolbar__item">
        <button
          onClick={handleClick}
          ref={refs.setReference}
          className="c-list-toolbar__item__btn"
        >
          {isDelete && <TrashIcon />}
          {isFilter && <FilterIcon />}
          {isSort && <SortIcon />}
          {currentActive}
        </button>
      </div>
      {(isSort || isFilter) && openModalOptions && (
        <DynamicModal ref={refs.setFloating}>
          {isSort && <span className="c-dynamic-modal__title">Sort by</span>}
          {isFilter && (
            <span className="c-dynamic-modal__title">Filter by</span>
          )}
          {children}
        </DynamicModal>
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

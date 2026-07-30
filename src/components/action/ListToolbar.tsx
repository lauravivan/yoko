import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import TrashIcon from '@/components/display/icons/toolbar/Trash';
import FilterIcon from '@/components/display/icons/toolbar/Filter';
import SortIcon from '@/components/display/icons/toolbar/Sort';
import DynamicModal from '@/components/display/DynamicModal';
import { autoPlacement, autoUpdate, useFloating } from '@floating-ui/react-dom';

interface ListToolbarItemProps {
  children?: React.ReactNode;
  type: 'delete' | 'filter' | 'sort' | 'toggle';
  ToggleIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onToggle?: () => void;
  currentActive: string;
  toggleTitle?: string;
}

const ListToolbarItem = ({
  children,
  type,
  currentActive,
  ToggleIcon,
  onToggle,
  toggleTitle,
}: ListToolbarItemProps) => {
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [openModalChoice, setOpenModalChoice] = useState(false);

  const isSort = type === 'sort';
  const isFilter = type === 'filter';
  const isDelete = type === 'delete';
  const isToggle = type === 'toggle';

  const handleClick = () => {
    if (isSort || isFilter) setOpenModalOptions((prev) => !prev);
    else if (isDelete) setOpenModalChoice((prev) => !prev);
    else onToggle?.();
  };

  const { refs } = useFloating({
    open: openModalOptions,
    middleware: [autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  const btnTitle = useMemo(() => {
    if (isFilter) return 'Filter';
    if (isSort) return 'Sort';
    if (isDelete) return 'Delete';
    return toggleTitle;
  }, [isFilter, isSort, isDelete, isToggle]);

  return (
    <div className="c-list-toolbar__item-wrapper">
      <div className="c-list-toolbar__item-wrapper__item">
        <button
          onClick={handleClick}
          ref={refs.setReference}
          className="c-list-toolbar__item-wrapper__item__btn"
          title={btnTitle}
        >
          {isDelete && <TrashIcon />}
          {isFilter && <FilterIcon />}
          {isSort && <SortIcon />}
          {isToggle && ToggleIcon && <ToggleIcon />}
          {currentActive}
        </button>
      </div>
      {(isSort || isFilter) && openModalOptions && (
        <>
          {/* eslint-disable react-hooks/refs -- false positive refs.setFloating floating-ui */}
          <DynamicModal ref={refs.setFloating}>
            {isSort && <span className="c-dynamic-modal__title">Sort by</span>}
            {isFilter && (
              <span className="c-dynamic-modal__title">Filter by</span>
            )}
            {children}
          </DynamicModal>
          {/* eslint-enable react-hooks/refs */}
        </>
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

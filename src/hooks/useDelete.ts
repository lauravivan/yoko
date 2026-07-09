import { useState } from 'react';

const useDelete = () => {
  const [selectedCount, setSelectedCount] = useState(0);

  const onSelect = () => {
    setSelectedCount((prev) => prev + 1);
  };

  const onDeselect = () => {
    setSelectedCount((prev) => prev - 1);
  };

  return {
    onSelect,
    onDeselect,
    selectedCount,
  };
};

export default useDelete;

import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import useOccurrenceStore from '@/store/occurrenceStore';
import { useRef, useState } from 'react';

const useOccurrenceForm = ({ occurrenceId }: { occurrenceId: string }) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const {
    updateOccurrenceTitle,
    updateOccurrenceDesc,
    updateOccurrenceStartDate,
    updateOccurrenceCategory,
  } = useOccurrenceStore();
  const [titleEditMode, setTitleEditMode] = useState(false);

  const handleTitleUpdateOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && titleRef.current) {
      updateOccurrenceTitle(occurrenceId, titleRef.current.value);
      titleRef.current.blur();
      setTitleEditMode(false);
    }
  };

  const handleTitleUpdateOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    updateOccurrenceTitle(occurrenceId, e.target.value);
    setTitleEditMode(false);
  };

  const handleTitleEditMode = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    setTitleEditMode(true);
  };

  const handleDescUpdateOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey && descRef.current) {
      updateOccurrenceDesc(occurrenceId, descRef.current.value);
      descRef.current.blur();
    }
  };

  const handleDescUpdateOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    updateOccurrenceDesc(occurrenceId, e.target.value);
  };

  const handleStartDateUpdateOnBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    updateOccurrenceStartDate(occurrenceId, new Date(e.target.value));
  };

  const handleCategoryUpdateOnBlur = (
    e: React.FocusEvent<HTMLSelectElement>
  ) => {
    const isValidCategory = Object.values(OccurrenceCategoryEnum).some(
      (c) =>
        c ===
        (e.target.options[e.target.selectedIndex]
          .value as OccurrenceCategoryEnum)
    );
    updateOccurrenceCategory(
      occurrenceId,
      isValidCategory
        ? (e.target.value as OccurrenceCategoryEnum)
        : OccurrenceCategoryEnum.Personal
    );
  };

  return {
    titleRef,
    descRef,
    handleDescUpdateOnKeyDown,
    handleTitleUpdateOnKeyDown,
    handleTitleUpdateOnBlur,
    handleTitleEditMode,
    handleDescUpdateOnBlur,
    handleStartDateUpdateOnBlur,
    titleEditMode,
    handleCategoryUpdateOnBlur,
  };
};

export default useOccurrenceForm;

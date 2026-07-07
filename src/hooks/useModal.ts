import useModalStore from '@/store/modalStore';

const useModal = () => {
  const { handleOpen, setContentType, isOpen, title, contentType, setTitle } =
    useModalStore();

  const openModal = (type: string) => {
    handleOpen(true);
    setContentType(type);
  };

  const closeModal = () => {
    handleOpen(false);
  };

  return {
    openModal,
    closeModal,
    isOpen,
    handleTitle: setTitle,
    title,
    contentType,
  };
};

export default useModal;

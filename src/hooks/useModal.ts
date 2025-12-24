import useModalStore from "@/store/modalStore";
import { ModalContentType } from "@/types/modal";

const useModal = () => {
  const { handleOpen, setContentType, isOpen, title, contentType, setTitle } =
    useModalStore();

  const openModal = (type: ModalContentType) => {
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

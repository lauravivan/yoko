import { create } from "zustand";
import { ModalContentType } from "@/types/modal";

interface EventStoreState {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  contentType: ModalContentType;
  setContentType: (contentType: ModalContentType) => void;
  title: string;
  setTitle: (title: string) => void;
}

const useModalStore = create<EventStoreState>((set) => ({
  isOpen: false,
  handleOpen: (isOpen: boolean) => set((state) => ({ ...state, isOpen })),
  contentType: "card",
  setContentType: (contentType: ModalContentType) =>
    set((state) => ({ ...state, contentType })),
  title: "",
  setTitle: (title: string) => set((state) => ({ ...state, title })),
}));

export default useModalStore;

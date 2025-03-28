import { ChannelType, Server, Channel, Member } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, string>;
  fileUrl?: string;
  member?: Member;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  openModal: (type, data = {}) => set({ type, isOpen: true, data }),
  closeModal: () => set({ type: null, isOpen: false }),
}));

import { create } from "zustand";

interface PendingState {
  isPending: boolean;
  updatePending: (isPending: boolean) => void;
}

export const usePendingStore = create<PendingState>((set) => ({
  isPending: false,
  updatePending: (isPending: boolean) => set({ isPending: isPending }),
}));

import { create } from "zustand";

type State = {
  phoneNumber: string;
};

type Actions = {
  setPhoneNumber: (number: string) => void;
};

export const usePhoneNumber = create<State & Actions>((set) => ({
  phoneNumber: "",
  setPhoneNumber: (number) => set({ phoneNumber: number }),
}));

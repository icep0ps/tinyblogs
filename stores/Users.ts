import { IUser } from '../Types';
import { create } from 'zustand';

type State = {
  user: IUser | null;
};

type Action = {
  createUser: (user: State['user']) => void;
  removeUser: () => void;
};

const useStore = create<State & Action>((set) => ({
  user: null,
  createUser: (user: IUser | null) => set(() => ({ user: user })),
  removeUser: () => set({ user: null }),
}));

export default useStore;

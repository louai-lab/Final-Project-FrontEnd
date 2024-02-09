import { create } from "zustand";
import axiosInstance from "../Utils/AxiosInstance";

export const useUserStore = create((set) => ({
  user: null,
  loading: true,
  users: [],
  setUser: (data) => set(() => ({ user: data })),
  logOut: () => set(() => ({ user: null })),
  getUser: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get("/user/logged-in-user");
      if (response) {
        // console.log(response);
        set({ user: response.data.user, loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));

export const useUsersStore = create((set) => ({
  users: [],
  loading: true,
  getAllUsers: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get("/user");
      if (response) {
        // console.log(response.data);
        set({ users: response.data, loading: false });
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));



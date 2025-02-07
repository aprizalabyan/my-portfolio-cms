import { create } from "zustand";
import axios from "axios";
import { IDetails } from "@/interfaces/common";

interface IAboutState {
  s_dataAbout: IDetails;
  loading_about: boolean;
  getAboutData: () => Promise<any>;
  updateAboutData: (payload: any) => Promise<any>;
}

export const useAboutStore = create<IAboutState>((set) => ({
  s_dataAbout: {
    header: "",
    subheader: "",
    description: "",
  },
  loading_about: false,

  getAboutData: async () => {
    try {
      set({ loading_about: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/about",
      });
      const res_data: IDetails[] = res.data.data;
      set({ s_dataAbout: res_data[0] });
    } catch (err: any) {
    } finally {
      set({ loading_about: false });
    }
  },
  updateAboutData: async (payload) => {
    try {
      set({ loading_about: true });
      const res = await axios({
        method: "POST",
        url: "/api/content/about",
        data: payload,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_about: false });
    }
  },
}));

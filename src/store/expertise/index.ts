import { create } from "zustand";
import axios from "axios";
import { IExpertise } from "@/interfaces/common";

interface IExpertiseState {
  s_dataExpertise: IExpertise[];
  loading_expertise: boolean;
  getExpertiseData: () => Promise<any>;
  updateExpertiseData: (payload: any) => Promise<any>;
}

export const useExpertiseStore = create<IExpertiseState>((set) => ({
  s_dataExpertise: [
    {
      category: "",
      sub_category: [
        {
          name: "",
          value: "",
        }
      ]
    }
  ],
  loading_expertise: false,

  getExpertiseData: async () => {
    try {
      set({ loading_expertise: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/expertise",
      });
      const res_data: IExpertise[] = res.data.data;
      set({ s_dataExpertise: res_data });
    } catch (err: any) {
    } finally {
      set({ loading_expertise: false });
    }
  },
  updateExpertiseData: async (payload) => {
    try {
      set({ loading_expertise: true });
      const res = await axios({
        method: "POST",
        url: "/api/content/expertise",
        data: payload,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_expertise: false });
    }
  },
}));

import { create } from "zustand";
import axios from "axios";
import { IExperience } from "@/interfaces/common";

interface IExperienceState {
  s_dataExperience: IExperience[];
  loading_experience: boolean;
  getExperienceData: () => Promise<any>;
  updateExperienceData: (payload: any) => Promise<any>;
}

export const useExperienceStore = create<IExperienceState>((set) => ({
  s_dataExperience: [
    {
      year: "",
      position: "",
      company: "",
      description: "",
      tags: [],
      inputTag: "",
    },
  ],
  loading_experience: false,

  getExperienceData: async () => {
    try {
      set({ loading_experience: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/experience",
      });
      const res_data: IExperience[] = res.data.data;
      set({ s_dataExperience: res_data });
    } catch (err: any) {
    } finally {
      set({ loading_experience: false });
    }
  },
  updateExperienceData: async (payload) => {
    try {
      set({ loading_experience: true });
      const res = await axios({
        method: "POST",
        url: "/api/content/experience",
        data: payload,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_experience: false });
    }
  },
}));

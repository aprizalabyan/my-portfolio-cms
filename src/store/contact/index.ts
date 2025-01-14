import { create } from "zustand";
import axios from "axios";
import { IContact } from "@/interfaces/common";

interface IContactState {
  s_dataEmail: IContact[];
  s_dataSocmed: IContact[];
  loading_contact: boolean;
  getContactData: () => Promise<any>;
  updateContactData: (payload: any) => Promise<any>;
}

export const useContactStore = create<IContactState>((set) => ({
  s_dataEmail: [
    {
      type: "",
      title: "",
      url: "",
    },
  ],
  s_dataSocmed: [
    {
      type: "",
      title: "",
      url: "",
    },
  ],
  loading_contact: false,

  getContactData: async () => {
    try {
      set({ loading_contact: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/contact",
      });

      const res_data_email: IContact[] = res.data.data?.find(
        (item: any) => item.category == "email"
      ).data;

      const res_data_socmed: IContact[] = res.data.data?.find(
        (item: any) => item.category == "socmed"
      ).data;

      set({ s_dataEmail: res_data_email });
      set({ s_dataSocmed: res_data_socmed });
    } catch (err: any) {
    } finally {
      set({ loading_contact: false });
    }
  },
  updateContactData: async (payload) => {
    try {
      set({ loading_contact: true });
      const res = await axios({
        method: "POST",
        url: "/api/content/contact",
        data: payload,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_contact: false });
    }
  },
}));

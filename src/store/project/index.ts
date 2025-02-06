import { create } from "zustand";
import axios from "axios";
import { IProject } from "@/interfaces/common";

interface IProjectState {
  s_dataProjects: IProject[];
  s_totalItems: number;
  s_totalPages: number;
  loading_project: boolean;
  getProjectData: (payload: any) => Promise<any>;
  addProjectData: (payload: any) => Promise<any>;
  updateProjectData: (payload: any) => Promise<any>;
  deleteProjectData: (payload: any) => Promise<any>;
}

export const useProjectStore = create<IProjectState>((set) => ({
  s_dataProjects: [
    {
      title: "",
      description: "",
      tags: [],
      url: "",
      year: "",
      image: null,
    },
  ],
  s_totalItems: 0,
  s_totalPages: 0,
  loading_project: false,

  getProjectData: async (payload) => {
    try {
      set({ loading_project: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/project",
        params: payload,
      });
      const res_data: IProject[] = res.data.data.data;
      set({
        s_dataProjects: res_data,
        s_totalItems: res.data.data.total_items,
        s_totalPages: res.data.data.total_pages,
      });
    } catch (err: any) {
    } finally {
      set({ loading_project: false });
    }
  },
  addProjectData: async (payload: IProject) => {
    try {
      set({ loading_project: true });
      const formData = new FormData();
      const { image, ...othersData } = payload;
      if (image instanceof File) formData.append("file", image);
      formData.append("data", JSON.stringify(othersData));

      const res = await axios({
        method: "POST",
        url: "/api/content/project",
        data: formData,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_project: false });
    }
  },
  updateProjectData: async (payload) => {
    try {
      set({ loading_project: true });
      const formData = new FormData();
      const { image, ...othersData } = payload;
      if (image instanceof File) formData.append("file", image);
      formData.append("data", JSON.stringify(othersData));

      const res = await axios({
        method: "PUT",
        url: "/api/content/project",
        data: formData,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_project: false });
    }
  },
  deleteProjectData: async (payload) => {
    try {
      set({ loading_project: true });
      const res = await axios({
        method: "DELETE",
        url: `/api/content/project/${payload}`,
      });
      return res;
    } catch (err: any) {
    } finally {
      set({ loading_project: false });
    }
  },
}));

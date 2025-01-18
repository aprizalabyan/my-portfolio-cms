import { create } from "zustand";
import axios from "axios";
import { IProject } from "@/interfaces/common";

interface IProjectState {
  s_dataProjects: IProject[];
  loading_project: boolean;
  getProjectData: () => Promise<any>;
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
      image: null,
    },
  ],
  loading_project: false,

  getProjectData: async () => {
    try {
      set({ loading_project: true });
      const res = await axios({
        method: "GET",
        url: "/api/content/project",
      });
      const res_data: IProject[] = res.data.data;
      set({ s_dataProjects: res_data });
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

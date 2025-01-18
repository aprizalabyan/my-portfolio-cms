export interface IDetails {
  header: string;
  subheader: string;
  description: string;
}

export interface ISubcategory {
  name: string;
  value: string;
}

export interface IExpertise {
  category: string;
  sub_category: ISubcategory[];
}

export interface IExperience {
  year: string;
  position: string;
  company: string;
  description: string;
  tags: string[];
  inputTag: string;
}

export interface IProject {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: any;
}

export interface IFormParams {
  type: string;
  data: IProject;
}

export interface IContact {
  type: string;
  title: string;
  url: string;
}

export interface ITableHead {
  text: string;
  width: string;
}

export interface ITableRow {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
}
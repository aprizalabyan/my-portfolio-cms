export interface IDetails {
  header: string;
  subheader: string;
  description: string;
}

export interface ISubcategory {
  title: string;
  value: string;
}

export interface IExpertise {
  category: string;
  data: ISubcategory[];
}

export interface IExperience {
  year: string;
  position: string;
  company: string;
  description: string;
  tags: string[];
  inputTag: string;
}

export interface IFormData {
  title: string;
  description: string;
  url: string;
  image: any;
}

export interface IFormParams {
  type: string;
  data: IFormData;
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
  image: string;
}
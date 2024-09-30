export interface People {
  data: PersonData[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface PersonData {
  id: number;
  attributes: PersonAttributes;
}

export interface PersonAttributes {
  name: string;
  age: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

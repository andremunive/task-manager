export interface People {
  data: PersonData[];
}

export interface PersonData {
  id: number;
  attributes: PersonAttributes;
}

export interface PersonAttributes {
  name: string;
  age: string; // En este caso, el "age" es un string
  skills: string[]; // Lista de habilidades
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

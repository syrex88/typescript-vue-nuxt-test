export * from './vue'

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string
}

export interface Users {
  [id: number]: User;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Todos {
  [id: number]: Todo;
}

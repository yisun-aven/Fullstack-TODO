export interface ITodo {
    _id?: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    completed: boolean;
    createdAt?: Date;
  }
  
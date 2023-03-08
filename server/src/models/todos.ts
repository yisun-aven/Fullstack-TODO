import * as mongoose from "mongoose";
import { Model } from "mongoose";

type TodoType = TodoModel & mongoose.Document;
export interface TodoModel {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    completed: boolean;
    createdAt: Date;
    _id?: string
}

const TodosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: false
    },

    completed: {
        type: Boolean,
        required: true,
        default: false
    },

    priority: {
        type: Number,
        required: true,
        validate: {
            validator: function(value: number): boolean {
                return value >= 1 && value <= 5;
            },
            message: "Priority must be a number between 1 and 5."
        },
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Todo: Model<TodoType> = mongoose.model < TodoType > ("Todo", TodosSchema);
export default Todo;
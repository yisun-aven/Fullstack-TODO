import { Router } from "express";
import {
    createToDo,
    clearToDo, 
    getToDo,
    deleteToDo,
    sortDateToDo,
    prioritizeToDo, 
    findToDo,
    updateToDo,
} from "../controller/todos";

const router = Router();

router.post("/", createToDo);

router.get("/", getToDo);

router.put("/:id", updateToDo);

router.patch("/", sortDateToDo);

router.delete("/:id", deleteToDo);

router.delete("/", clearToDo);

router.get("/prioritizeToDo", prioritizeToDo);

router.get('/findTodo/:title', findToDo);

export default router;
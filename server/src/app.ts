import express from "express";
const mongoose = require('mongoose');
import todoRoutes from "./routes/todos";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);


app.use("/todos", todoRoutes);

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
    )=>{res.status(500).json({ message: err.message });}
);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
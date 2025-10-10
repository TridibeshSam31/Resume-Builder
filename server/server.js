import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config(
    {
        path: "./.env"
    }
);


const PORT = process.env.PORT || 4000 ;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("MONGODB CONNECTION ERROR", err);
    process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.json());

 
app.use('/api/users', userRouter) 


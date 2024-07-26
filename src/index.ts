import { AppDataSource } from "./db/data-source";
import express from "express";
import { userRouter } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());

    app.use('/api/v1/users', userRouter);

    app.use(errorHandler);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    
}).catch(error => console.log(error));

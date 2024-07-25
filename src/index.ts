import { AppDataSource } from "./db/data-source";
import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./routes";

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());

    // Configuración de rutas
    app.use('/api/v1/users', userRouter);

    // Middleware para manejar errores
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    });

    // Iniciar el servidor
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    
}).catch(error => console.log(error));

import express, { type Response } from 'express'
import {config} from '@repo/config'
import projectRouter from './routes/project.route'
import userRouter from './routes/user.route'

const app = express();
app.use(express.json());

app.get("/", (_, res: Response) => {
    return res.json({message: "Unlovable is up!"})
})  

app.use("/api/auth", userRouter)
app.use("/api/project", projectRouter);

app.listen(config.BACKEND_PORT, () => {
    console.log(`Backend started at Port ${config.BACKEND_PORT}`)
})
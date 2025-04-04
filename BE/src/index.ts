import express from "express"
import { PORT } from "./config/dotenv"
import cors from "cors"
import { router as userRouter } from "./routes/user"
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/v1/user", userRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Jay Ganesh !"
    })
})
app.listen(PORT, () => {
    console.log("server started on port number : ", PORT);
})
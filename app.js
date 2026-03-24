import express from "express"
import userRouter from "./routes/userRoutes.js"
import companyRouter from "./routes/companyRoutes.js"


const app = express()
const port = 3000
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/company", companyRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

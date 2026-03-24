import express from 'express'
import { addUser, deleteUser, getUsers, getUsersById, updateUser } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter.get("/", getUsers)
userRouter.get("/:id", getUsersById)
userRouter.post("/", addUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


export default userRouter
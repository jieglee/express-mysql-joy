import express from 'express'
import { addCompany, deleteCompany, getCompanies, getCompanyById, updateCompany } from '../controllers/companyControllers.js'

const companyRouter = express.Router()

companyRouter.get("/", getCompanies)
companyRouter.get("/:id", getCompanyById)
companyRouter.post("/", addCompany)
companyRouter.put("/:id", updateCompany)
companyRouter.delete("/:id", deleteCompany)


export default companyRouter
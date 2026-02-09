import { CategoryCreateInput } from "../../../prisma/generated/prisma/models"
import { prisma } from "../../lib/prisma"


const addSubjects=async(body:CategoryCreateInput)=>{
const result=await prisma.category.createMany({
    data:body,
    skipDuplicates:true
})
}




export const categoryServices={
    addSubjects
}
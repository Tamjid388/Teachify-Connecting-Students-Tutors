import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {

  return await prisma.user.findMany();
};

const updateUserStatus = async (userId: string, status:UserStatus) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select:{
        status:true
    }
  });
};

export const adminServices = {
  getAllUsers,updateUserStatus
};
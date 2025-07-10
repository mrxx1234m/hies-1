import { PrismaService } from "src/core/database/prisma.service"

const findUserId = async (params:number) => {
    const prisma = new PrismaService()
    const oldUser = await prisma.users.findFirst({where:{id:params}})
    return oldUser
}
export default findUserId
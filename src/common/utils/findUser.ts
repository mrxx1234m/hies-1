import { PrismaService } from "src/core/database/prisma.service"

const findUser = async (params:string) => {
    const prisma = new PrismaService()
    const oldUser = await prisma.users.findFirst({where:{email:params}})
    return oldUser
}
export default findUser
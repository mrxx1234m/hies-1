import { PrismaService } from "../database/prisma.service"
import * as bcrypt from 'bcrypt'
const superadminCreate = async ()=>{
    const prisma = new PrismaService()
    const oldUser = await prisma.users.findFirst({where:{email:'superadmin@gmail.com'}})
    if(!oldUser){
        const password = await bcrypt.hash('12345678',10)
        await prisma.users.create({data:{fullname:'superadmin',password:password,email:'superadmin@gmail.com'}})
    }
}
export default superadminCreate
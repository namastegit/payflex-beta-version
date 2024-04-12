import NextAuth from "next-auth"
import { authOptions } from "../../../lib/auth"


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

//can also be written like this - export 
// export const GET = handler
//export const POST = handler
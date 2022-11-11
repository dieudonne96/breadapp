import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";
import { prisma } from '../../../server/db/client'
import * as argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  //adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email", placeholder: "jsmith@example.co.za" },
        password: { label: "Password", type: "password" },
      },
      authorize : async (credentials)=> {
        if(credentials){
          const user = await prisma.user.findUnique({ 
            where: { email: credentials.username },
            include: { auth : true, business : true }
          })
          if(user && user.auth){
            const verified = await argon2.verify(user.auth.password, credentials.password)
            if (user && verified) {
              return user;
            }
          }
        }
        return null
      },
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret : env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

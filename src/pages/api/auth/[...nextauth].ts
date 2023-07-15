import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { token } = credentials;
        if (token) {
          return credentials;
        }
        return null;
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, //expires after 30 days
  },

  jwt: {},

  callbacks: {
    async session({ session, token }: any) {
      session.user = token.user;

      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

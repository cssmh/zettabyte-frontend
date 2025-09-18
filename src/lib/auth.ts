import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If we have a stored callback URL, use it
      if (url.includes("callbackUrl")) {
        return url;
      }

      // After login, redirect to profile
      if (url.startsWith(baseUrl + "/api/auth")) {
        return `${baseUrl}/profile`;
      }

      // If redirecting to a relative URL, use baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // If redirecting to same site, allow it
      if (new URL(url).origin === baseUrl) return url;

      // Default to profile page
      return `${baseUrl}/profile`;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

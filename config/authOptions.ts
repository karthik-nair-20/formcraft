import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDb } from "./database";
import User from "@/models/userModel";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/user-authentication",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (!account || (account.provider !== "google" && account.provider !== "github")) {
        return true;
      }

      try {
        const emailFromProfile =
          typeof profile?.email === "string" ? profile.email : null;
        const rawEmail = user.email ?? emailFromProfile;
        if (!rawEmail) {
          return false;
        }

        const normalizedEmail = rawEmail.trim().toLowerCase();
        const fallbackName = normalizedEmail.split("@")[0];
        const profileName =
          typeof profile?.name === "string" ? profile.name : fallbackName;
        const imageFromProfile =
          typeof (profile as { picture?: unknown } | undefined)?.picture === "string"
            ? (profile as { picture: string }).picture
            : typeof (profile as { avatar_url?: unknown } | undefined)?.avatar_url === "string"
              ? (profile as { avatar_url: string }).avatar_url
              : null;
        const profileImage = user.image ?? imageFromProfile;

        await connectToDb();
        await User.findOneAndUpdate(
          { email: normalizedEmail },
          {
            $set: {
              name: (profileName || fallbackName).slice(0, 50),
              image: profileImage,
              authProvider: account.provider,
              isVerified: true,
            },
            $setOnInsert: {
              email: normalizedEmail,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return true;
      } catch (error) {
        console.error("NextAuth OAuth signIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account && token.email) {
        await connectToDb();
        const dbUser = await User.findOne({
          email: String(token.email).trim().toLowerCase(),
        }).select("_id authProvider");

        if (dbUser) {
          token.sub = dbUser._id.toString();
          token.provider = dbUser.authProvider as "credentials" | "google" | "github";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

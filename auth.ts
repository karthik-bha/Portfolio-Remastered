import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHubProvider({
          clientId: process.env.AUTH_GITHUB_ID!,
          clientSecret: process.env.AUTH_GITHUB_SECRET!,
          issuer: "https://github.com/login/oauth",
        }),
      ],
      secret: process.env.AUTH_SECRET,
})
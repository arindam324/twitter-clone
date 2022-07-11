import NextAuth from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
import GooogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    // GithubProvider({}),
    GooogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
})

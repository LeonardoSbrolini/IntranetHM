import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { User } from "@/types/user";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				 console.log('credentials:', credentials)
				const response = await fetch(`http://localhost:3000/api/users`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						username: credentials?.username,
						password: credentials?.password
					})
				})
				const user: any = await response.json()
				if (user == '' || !user) {
					return null
				}
				if (response.ok) {
					return user;
				}
				return null
			}
		})
	],
	pages: {
		signIn: '/', // Página de login
		error: '/auth/error', // Página de erro personalizada
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const u = user as User
				token.id = u.id;
				token.name = u.name;
				token.role = u.role;
				token.company = u.company;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.user) {
				session.user = token.user as any;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET
}
)

export { handler as GET, handler as POST };
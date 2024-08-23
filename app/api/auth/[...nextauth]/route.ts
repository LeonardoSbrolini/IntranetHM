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
				console.log('CREDENTIALS', credentials)
				console.log('CREDENTIALS USERNAME: ', credentials?.username)
				console.log('CREDENTIALS PASSWORD: ', credentials?.password)
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						teste: 'teste',
						username: credentials?.username,
						password: credentials?.password
					})
				});

				const user: User = await response.json();
				
				if (!user || !response.ok) {
					return null;
				}

				return user;
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
				token.user = user as User
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.user) {
				session.user = token.user as User
				console.log('session', session)
			}
			return session;
		},
	},
	jwt: {
		// Define a expiração do token JWT em segundos (1 hora, por exemplo)
		maxAge: 60 * 60, // 1 hora
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
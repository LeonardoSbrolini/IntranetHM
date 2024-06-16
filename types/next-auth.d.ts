import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            image?: string | null;
            role: string | null;
            company: string;
        }
    }
}

declare module 'next-auth/JWT' {
    interface Token {
        user: {
            id: string;
            name: string;
            image?: string | null;
            role: string | null;
            company: string;
        }
    }
}
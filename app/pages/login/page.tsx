"use client"
import { signIn } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username || !password) {
            console.log("Por favor, preencha todos os campos.")
            return;
        }
        console.log(`username: ${username}, password: ${password}`)

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        console.log(`erro`)
        if (result?.error) {
            console.log('Login ou senha inválidos.')
            return;
        }

        console.log('autenticado')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Usuário:
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Senha:
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

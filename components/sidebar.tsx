export default function Sidebar() {
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Página Inicial
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Notícias
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Atalhos
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Manuais
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Ramais
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Registro de Ponto
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Aniversariantes
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Painéis
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Sustentabilidade
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Reclamações / Denúncias
            </div>

            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
                Idéia premiada
                {/* <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                                1
                            </Badge> */}
            </div>
        </nav>
    )
}
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip"
import Link from "next/link";
import { Bell, BookMarked, Cake, CreditCard, ExternalLink, Headset, Home, LineChart, Monitor, Newspaper, Package, Package2, Phone, Recycle, Settings, ShoppingCart, Star, TriangleAlert, Users, Users2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export default function LefBar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Intranet HM</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Página Inicial
                        </Link>

                        <Link
                            href="http://10.4.1.22/hmhelpdesk"
                            target='_blank'
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Headset className="h-4 w-4" />
                            Chamados T.I
                        </Link>

                        <Link
                            href="/pages/noticias"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Newspaper className="h-4 w-4" />
                            Notícias
                        </Link>

                        <Link
                            href="/pages/atalhos"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Atalhos
                        </Link>

                        <Link
                            href="/pages/manuais"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <BookMarked className="h-4 w-4" />
                            Manuais
                        </Link>

                        <Link
                            href="/pages/ramais"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Phone className="h-4 w-4" />
                            Ramais
                        </Link>

                        <Link
                            href="/pages/registroponto"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <CreditCard className="h-4 w-4" />
                            Registro de Ponto
                        </Link>

                        <Link
                            href="/pages/aniversariantes"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Cake className="h-4 w-4" />
                            Aniversariantes
                        </Link>

                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Monitor className="h-4 w-4" />
                            Painéis
                        </Link>

                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1" className="w-full border-none">
                                <AccordionTrigger
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Link
                            href="/pages/sustentabilidade"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Recycle className="h-4 w-4" />
                            Sustentabilidade
                        </Link>

                        <Link
                            href="/pages/reclamacoes"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <TriangleAlert className="h-4 w-4" />
                            Reclamações / Denúncias
                        </Link>

                        <Link
                            href="/pages/ideiapremiada"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Star className="h-4 w-4" />
                            Idéia premiada
                            {/* <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                                1
                            </Badge> */}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
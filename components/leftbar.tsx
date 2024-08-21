import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip"
import Link from "next/link";
import { Bell, BookMarked, Cake, CornerDownRight, CreditCard, ExternalLink, Headset, Home, Monitor, Newspaper, Package2, Phone, Recycle, Star, TriangleAlert } from "lucide-react";
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
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Home className="h-4 w-4" />
                                        Página Inicial
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="http://10.4.1.22/hmhelpdesk"
                                        target='_blank'
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Headset className="h-4 w-4" />
                                        Chamados T.I
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/noticias"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Newspaper className="h-4 w-4" />
                                        Notícias
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-4" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/atalhos"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Atalhos
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-5" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/manuais"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <BookMarked className="h-4 w-4" />
                                        Manuais
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-6" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/ramais"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Ramais
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-7" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={true}
                                >
                                    <div
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Registro de Ponto
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <Link
                                        href="/pages/registroponto/criar"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Criar registro
                                    </Link>
                                    <Link
                                        href="/pages/registroponto/meusregistros"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Meus registros
                                    </Link>
                                    <Link
                                        href="/pages/registroponto/gestao"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Gestão
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-8" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/aniversariantes"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Cake className="h-4 w-4" />
                                        Aniversariantes
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-9" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={true}
                                >
                                    <div
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Monitor className="h-4 w-4" />
                                        Painéis
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Cartão Ponto
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Centro Cirúrgico
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Enfermaria 1
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Enfermaria 2
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-10" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/pages/sustentabilidade"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Recycle className="h-4 w-4" />
                                        Sustentabilidade
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-11" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={false}
                                >
                                    <Link
                                        href="/reclamacoes"
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <TriangleAlert className="h-4 w-4" />
                                        Reclamações / Denúncias
                                    </Link>
                                </AccordionTrigger>
                            </AccordionItem>
                            <AccordionItem value="item-12" className="w-full border-none">
                                <AccordionTrigger
                                    className="hover:no-underline w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    showIcon={true}
                                >
                                    <div
                                        className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Star className="h-4 w-4" />
                                        Idéia premiada
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <Link
                                        href="/pages/ideiapremiada/criar"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Criar ideia premiada
                                    </Link>
                                    <Link
                                        href="/pages/ideiapremiada/minhasideias"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Minhas ideias
                                    </Link>
                                    <Link
                                        href="/pages/ideiapremiada/gestao"
                                        className="flex items-center gap-3 px-6 py-2 rounded-lg text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <CornerDownRight className="h-4 w-4" />
                                        Gestão de ideias
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </nav>
                </div>
            </div>
        </div>
    )
}
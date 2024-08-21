"use client"
import { useState } from "react"
import Breadcrumb from "@/components/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Container from "@/components/container"

export default function CriarIdeiaPremiadaPage() {
    const [termsIsOpen, setTermsIsOpen] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('1')

    const handleOpenCloseDialog = () => {
        if (isChecked) {
            console.log('entro no IF')
            setIsChecked(false)
            console.log('isChecked', isChecked)
            return
        } else {
            console.log('entro no ELSE')
            setTermsIsOpen(!termsIsOpen)
        }
    }

    const handleAcceptTerms = () => {
        setTermsIsOpen(false)
        setIsChecked(true)
    }


    return (
        <Container>
            <Breadcrumb title="Reclamações" subtitle="Fale com a diretoria" />

            <div className="flex flex-col xl:flex-row grow justify-center items-center">
                <div className="flex flex-col h-full p-6 basis-full md:basis-[50%]">
                    <div className="text-xl md:text-2xl text-center pb-4 font-bold">
                        Regras para preenchimento
                    </div>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Preencha todos os campos obrigatórios.</li>
                        <li>Verifique se todas as informações estão corretas antes de enviar.</li>
                        <li>Não use caracteres especiais nos campos de texto.</li>
                        <li>O formulário deve ser enviado apenas uma vez para evitar duplicidade.</li>
                        <li>Se você não concordar com os termos, não envie o formulário.</li>
                    </ul>
                    <div className="flex items-center space-x-2">
                        <AlertDialog open={termsIsOpen} onOpenChange={setTermsIsOpen}>
                            <AlertDialogTrigger asChild>
                                <Checkbox
                                    id="terms"
                                    checked={isChecked}
                                    onClick={handleOpenCloseDialog}
                                />
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-[40rem]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="font-bold"> Termo de Responsabilidade e Conscientização</AlertDialogTitle>
                                    <AlertDialogDescription className="text-black">
                                        <ul className="flex flex-col gap-4">
                                            <li><strong>Confidencialidade e Anonimato</strong>: O colaborador pode optar por enviar suas reclamações ou denúncias de forma anônima. No entanto, para garantir a integridade das informações e a segurança de todos os envolvidos, alguns dados pessoais poderão ser registrados e armazenados em nosso banco de dados, mesmo em casos de envio anônimo. Esses dados serão utilizados exclusivamente para o rastreamento de denúncias graves que possam necessitar de investigação mais aprofundada.</li>

                                            <li><strong>Responsabilidade sobre o Conteúdo Enviado</strong>: O colaborador se compromete a fornecer informações verdadeiras e precisas. O envio de informações falsas, caluniosas ou enganosas é considerado uma violação grave e pode resultar em medidas administrativas e/ou legais.</li>

                                            <li><strong>Finalidade das Informações Coletadas</strong>: As informações fornecidas através desta ferramenta serão analisadas pelo diretor da empresa ou por uma comissão designada, com o objetivo de promover um ambiente de trabalho mais seguro, justo e transparente. Qualquer abuso ou uso inadequado desta ferramenta será tratado com a seriedade necessária.</li>

                                            <li><strong>Proteção dos Dados</strong>: Todos os dados coletados serão tratados de acordo com as normas vigentes de proteção de dados pessoais, e serão acessíveis apenas para as finalidades descritas neste termo.</li>

                                            <li><strong>Consequências Legais</strong>: O colaborador está ciente de que o uso indevido desta ferramenta, incluindo a tentativa de causar dano intencional a terceiros através de denúncias falsas, poderá resultar em responsabilização legal.</li>
                                        </ul>

                                        <p className="py-4"><strong>Ao aceitar o termo acima, você declara que leu, compreendeu e concorda com os termos acima.</strong></p>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button variant="destructive" onClick={handleOpenCloseDialog}>Cancelar</Button>
                                    <Button variant="default" onClick={handleAcceptTerms}>Aceitar</Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Aceitar os Termos de responsabilidade e Conscientização
                        </label>
                    </div>
                </div>
                <div className="flex flex-col h-full items-center justify-center p-6 basis-full xl:basis-[50%]">
                    <div className="text-xl md:text-2xl text-center pb-4 font-bold">
                        Formulário
                    </div>
                    <form className="w-full">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message-2">Descreva sua reclamação</Label>
                            <Textarea placeholder="Escreva sua reclamação aqui." id="message-2" rows={10} />
                            <p className="text-sm text-muted-foreground">
                                Seja bem claro e objetivo ao descrever sua reclamação
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                            >
                                Enviar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </Container>
    )
}

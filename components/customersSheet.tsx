import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageIcon, Trash } from "lucide-react";
import Image from "next/image";
import { ComboBox } from "./combobox";
import { status } from "@/data/status";
import { category } from "@/data/category";
import { Customers } from "@/types/customer.type";

interface CustomersSheetProps {
    customer?: Customers
}

export default function CustomersSheet({ customer }: CustomersSheetProps) {
    return (
        <SheetContent className="w-[1000px] overflow-y-scroll custom-scrollbar">
            <SheetHeader>
                <SheetTitle>Produto</SheetTitle>
                <SheetDescription>
                    Após a alteração cliquem em Salvar para confirmar a alteração
                </SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="customer" className="py-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="customer">Produto</TabsTrigger>
                    <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="grid gap-4 py-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Imagem</Label>
                        <Input id="picture" type="file" className="cursor-pointer" />
                        <div className={`w-full h-[15rem] justify-center items-center flex ${customer && customer.image ? '' : 'border-dashed border-2 border-gray-400'}`}>
                            {customer && customer.image ?
                                <Image
                                    src={customer.image}
                                    width={300}
                                    height={300}
                                    alt={customer.name}
                                    className="object-contain w-full h-full"
                                /> :
                                <ImageIcon className="scale-[2.3] text-gray-400" />
                            }
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">
                            Nome
                        </Label>
                        <Input id="name" placeholder="Nome do produto" value={customer && customer.name ? customer.name : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="age">
                            Idade
                        </Label>
                        <Input id="age" placeholder="Idade do cliente" value={customer && customer.age ? customer.age : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="sex">
                            Sexo
                        </Label>
                        <ComboBox placeholder="Sexo" data={customer && customer.sex ? customer.sex : ''} options={[{ label: 'Masculino', value: 'M' }, { label: 'Feminino', value: 'F' }]} className='w-full' />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="phone">
                            Telefone
                        </Label>
                        <Input id="phone" placeholder="Telefone do cliente" value={customer && customer.phone ? customer.phone : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="cpf">
                            CPF
                        </Label>
                        <Input id="cpf" placeholder="CPF do cliente" value={customer && customer.cpf ? customer.cpf : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="cep">
                            CEP
                        </Label>
                        <Input id="cep" placeholder="CEP da residência" value={customer && customer.cep ? customer.cep : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="seeAt">
                            Visto por último
                        </Label>
                        <Input id="seeAt" disabled value={customer && customer.seeAt ? customer.seeAt : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="createAt">
                            Criação do cliente
                        </Label>
                        <Input id="createAt" disabled value={customer && customer.createAt ? customer.createAt : ''} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="status">
                            Status
                        </Label>
                        <ComboBox placeholder="Status" data={customer && customer.status ? customer.status : ''} options={status} className='w-full' />
                    </div>




                </TabsContent>



                <TabsContent value="history">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                04/06/2024 - lsbrolini - Update fields
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full flex justify-start items-center">
                                    <p className="pr-5">
                                        Original
                                    </p>
                                    <div className="flex flex-col">
                                        <span>Preço = R$10.99</span>
                                        <span>Nome = BOA</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    NEW
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </TabsContent>
            </Tabs>

            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Salvar</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}
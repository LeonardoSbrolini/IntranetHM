import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageIcon} from "lucide-react";
import Image from "next/image";
import { ComboBox } from "./combobox";
import { status } from "@/data/status";
import { category } from "@/data/category";

interface ProductsSheetProps {
    product?: any
}

export default function ProductsSheet({ product }: ProductsSheetProps) {
    return (
        <SheetContent className="w-[1000px] overflow-y-scroll custom-scrollbar">
            <SheetHeader>
                <SheetTitle>Produto</SheetTitle>
                <SheetDescription>
                    Após a alteração cliquem em Salvar para confirmar a alteração
                </SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="product" className="py-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="product">Produto</TabsTrigger>
                    <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="product" className="grid gap-4 py-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Imagem</Label>
                        <Input id="picture" type="file" className="cursor-pointer" />
                        <div className={`w-full h-[15rem] justify-center items-center flex ${product && product.image ? '' : 'border-dashed border-2 border-gray-400'}`}>
                            { product?.image ?
                                <Image
                                    src={product.image}
                                    width={300}
                                    height={300}
                                    alt={product.name}
                                    className="object-contain w-full h-full"
                                /> :
                                <ImageIcon className="scale-[2.3] text-gray-400" />
                            }
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="product">
                            Produto
                        </Label>
                        <Input id="product" placeholder="Nome do produto" value={product?.name} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="price">
                            Preço (R$)
                        </Label>
                        <Input id="price" placeholder="Preço do produto" value={product && (product?.price / 100).toFixed(2)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="category">
                            Categoria
                        </Label>
                        <ComboBox placeholder="Categoria" data={product?.category} options={category} className='w-full'/>
                        {/* <Input id="category" placeholder="Categoria do produto" value={product?.category} /> */}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="status">
                            Status
                        </Label>
                        <ComboBox placeholder="Status" data={product?.status} options={status} className='w-full'/>
                        {/* <Input id="status" placeholder="Status do produto" value={product?.status} /> */}
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
                    <Button type="submit">Save changes</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}
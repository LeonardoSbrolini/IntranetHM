"use client"
import { useEffect, useState } from "react"
import Breadcrumb from "@/components/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Container from "@/components/container"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { RegistroPontoData } from "@/data/registroPontoData"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { ptBR } from "date-fns/locale"

export default function RegristroPontoPage() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string | null>(null)
    const [date, setDate] = useState<Date>()

    return (
        <Container>
            <Breadcrumb title="Registro de Ponto" subtitle="Realize os registros de ponto digitalmente" />

            <div className="h-[30rem]">
                <div className="flex flex-col xl:flex-row h-full grow justify-center items-center">
                    <div className="flex h-full basis-full md:basis-[50%]">
                        <div className="flex flex-col justify-center item h-full p-6 basis-full">
                            <div className="text-xl md:text-2xl text-center pb-4 font-bold">
                                Regras para utilização
                            </div>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Só é permitido realizar TH / RH / TP / TF / RTS com a autorização de sua liderança.</li>
                                <li>Toda TH / RH / TP / TF / RTS deve ser enviada via intranet para liderança na data do evento citada. </li>
                                <li>Só é permitido o envio do registro de ponto até no máximo 2 dias úteis consecutivos a partir da data do evento.</li>
                                <li>É permitido realizar até 10 Trocas de horário (TH) por mês, caso exceda o limite deverá comunicar a liderança para formalizar a troca de horário.</li>
                                <li>Não é permitido fazer banco de horas sem a autorização prévia de sua liderança.</li>
                                <li>Não é permitido realizar Retirada de horas (RH) sem saldo em seu banco de horas.</li>
                                <li>Após o envio do formulário informar sua liderança sobre o envio do mesmo.</li>
                                <li>Os registros são enviados ao cartão de ponto no 25º dia do mês (Sujeito a alteração).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col h-full items-center justify-center p-6 basis-full xl:basis-[50%]">
                        <div className="text-xl md:text-2xl text-center pb-4 font-bold">
                            Formulário
                        </div>
                        <form className="w-full flex flex-col gap-6">
                            <div className="flex justify-center">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[20rem] justify-between"
                                        >
                                            {value
                                                ? RegistroPontoData.find((tipo) => tipo.id.toString() === value)?.name
                                                : "Selecione o tipo de registro..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[20rem] p-0">
                                        <Command>
                                            <CommandInput placeholder="Selecione o tipo de registro" />
                                            <CommandList>
                                                <CommandEmpty>Registro não encontrado</CommandEmpty>
                                                <CommandGroup>
                                                    {RegistroPontoData.map((tipo) => (
                                                        <CommandItem
                                                            key={tipo.id}
                                                            value={tipo.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue)
                                                                setOpen(false)
                                                                console.log(value)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    value === tipo.id.toString() ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {tipo.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex">
                                <div className="basis-[70%] flex flex-col justify-center h-[20rem]">
                                    {(value === "1") && (
                                        <div className="flex justify-between">
                                            <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                <Label htmlFor="inicio">Horário Inicial</Label>
                                                <Input id="inicio" type="time" className="w-[6rem] cursor-pointer" />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">Às</div>
                                            <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                <Label htmlFor="final">Horário Final</Label>
                                                <Input id="final" type="time" className="w-[6rem] cursor-pointer" />
                                            </div>
                                        </div>
                                    )}
                                    {(value === "2") && (
                                        <div className=" flex justify-evenly flex-col gap-8 h-full">
                                            {
                                                <div className="flex flex-col">
                                                    <div className="text-center text-lg font-semibold py-4">Horário Oficial</div>
                                                    <div className="flex justify-between">
                                                        <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                            <Label htmlFor="picture">Horário Inicial</Label>
                                                            <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                        </div>
                                                        <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                            <Label htmlFor="picture">Horário Final</Label>
                                                            <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            <div className="flex flex-col">
                                                <div className="text-center text-lg font-semibold py-4">Horário Novo</div>
                                                <div className="flex justify-between">
                                                    <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                        <Label htmlFor="picture">Horário Inicial</Label>
                                                        <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                    </div>
                                                    <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                        <Label htmlFor="picture">Horário Final</Label>
                                                        <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(value === "3" || value === "4") && (
                                        <div className="flex justify-between">
                                            <div className="grid w-full items-center justify-items-center gap-1.5">
                                                {/* <Popover>
                                                    <PopoverTrigger asChild>
                                                        <div className="grid w-full max-w-sm items-center text-start justify-items-center gap-1.5">
                                                            <Label>Data</Label>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    " justify-start text-left font-normal",
                                                                    !date && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date ? format(date, "PPP") : <span>Data</span>}
                                                            </Button>
                                                        </div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                        />
                                                    </PopoverContent>
                                                </Popover> */}
                                            </div>
                                        </div>
                                    )}
                                    {(value === "5") && (
                                        <div className="flex flex-col justify-between gap-2">
                                            <div className="flex">
                                                <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                    <Label htmlFor="picture">Horário Inicial</Label>
                                                    <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center justify-items-center gap-1.5">
                                                    <Label htmlFor="picture">Horário Final</Label>
                                                    <Input id="picture" type='time' className="w-[6rem] cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5">
                                                <Label htmlFor="picture">Justificativa</Label>
                                                <Textarea id="picture" className="h-[10rem]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="basis-[30%] flex items-center justify-center">
                                    {(value === "1" || value === "2" || value === "3" || value === "4" || value === "5") && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <div className="grid w-full max-w-sm items-center text-start justify-items-center gap-1.5">
                                                    <Label htmlFor="picture">Data</Label>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            " w-[10rem] justify-start text-left font-normal",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, "PPP") : <span>Data</span>}
                                                    </Button>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    )
}

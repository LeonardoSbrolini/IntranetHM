"use client";
import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type PaginationState, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronsUpDown, MoreHorizontal, Check, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import type { RamalType } from "@/types/ramalType";
import type { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";

export const columns: ColumnDef<RamalType>[] = [
    {
        accessorKey: "funcionario",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Funcionario
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("funcionario")}</div>,
    },
    {
        accessorKey: "setor",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Setor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("setor")}</div>,
    },
    {
        accessorKey: "tipo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="uppercase">{row.getValue("tipo") || "N/A"}</div>,
    },
    {
        accessorKey: "registro",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Registro
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("registro") || "N/A"}</div>,
    },
    {
        accessorKey: "data",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            const data = row.getValue("data");
            let formattedDateTime = "N/A";
        
            if (data) {
                const date = new Date(data);
                date.setHours(date.getHours() + 3); // Adiciona 3 horas
        
                formattedDateTime = `${date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            }
        
            return <div>{formattedDateTime}</div>;
        },
    },
    {
        accessorKey: "envio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Envio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            const envio = row.getValue("envio");
            let formattedDateTime = "N/A";
        
            if (envio) {
                const date = new Date(envio);
                date.setHours(date.getHours() + 3); // Adiciona 3 horas
        
                formattedDateTime = `${date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`;
            }
        
            return <div>{formattedDateTime}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("status") || "N/A"}</div>,
    },
    {
        accessorKey: "exportado",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Exportado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("exportado") ? 'Sim' : "Não"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const ramal = row.original;
            // const ClipboardRamalText = `ramal: ${ramal.ramal.toString()}, setor: ${ramal.setor.toString()}${ramal.sala && `, sala: ${ramal.sala.toString()}`}${ramal.responsavel && `, responsável: ${ramal.responsavel.toString()}`} `
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText('ClipboardRamalText')}>
                            Copiar Ramal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// Função de filtro para buscar por setor, sala ou texto livre
function CustomFilter(row: any, columnId: any, value: any) {
    const funcionario = row.getValue('funcionario')?.toString() || '';
    const setor = row.getValue('setor')?.toLowerCase() || '';
    const cargo = row.getValue('cargo')?.toLowerCase() || '';
    const responsavel = row.getValue('responsavel')?.toLowerCase() || '';
    const searchTerm = value.toLowerCase();

    return funcionario.includes(searchTerm) || setor.includes(searchTerm) || cargo.includes(searchTerm) || responsavel.includes(searchTerm);
}

export function RegistroPontoTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [setorFilter, setSetorFilter] = React.useState<string>("");
    const [salaFilter, setSalaFilter] = React.useState<string>("");
    const [registroPonto, setRegistroPonto] = useState<RamalType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1'

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const router = useRouter()

    const handleNextPage = (pageIndex: any) => {
        if (pagination.pageIndex >= table.getPageCount() - 1) {
            return
        }
        const params = new URLSearchParams(searchParams)

        params.set('page', (Number(pageIndex) + 1).toString())
        router.push(`/pages/registroponto/gestao?${params.toString()}`)
        console.log(pageIndex)
        console.log(`/pages/registroponto/gestao?${params.toString()}`)
        console.log(pagination.pageIndex)
        table.setPageIndex(pagination.pageIndex + 1)
    }

    const handlePreviousPage = (pageIndex: any) => {
        if (pageIndex <= 1) {
            return
        }
        const params = new URLSearchParams(searchParams)

        params.set('page', (Number(pageIndex) - 1).toString())
        router.push(`/pages/registroponto/gestao?${params.toString()}`)
        console.log(pageIndex)
        console.log(`/pages/registroponto/gestao?${params.toString()}`)
        console.log(pagination.pageIndex)
        table.setPageIndex(pagination.pageIndex - 1)
    }

    const handleGoToPage = (page: any) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', (Number(page)).toString())
        router.push(`/pages/registroponto/gestao?${params.toString()}`)

        table.setPageIndex(page - 1)
    }

    const data = registroPonto;

    const table = useReactTable({
        data,
        initialState: {
            pagination: { pageIndex: Number(page) - 1 }
        },
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination,
        },
        globalFilterFn: CustomFilter, // Função de filtro personalizada
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    });

    useEffect(() => {
        const fetchRegistroPonto = async () => {
            try {
                const response = await fetch('/api/registroponto');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os ramais');
                }
                const data = await response.json();
                setRegistroPonto(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistroPonto();
    }, []);

    useEffect(() => {
        if (pagination.pageIndex > table.getPageCount()) {
            const params = new URLSearchParams(searchParams)
            params.set('page', ('1'))
            router.push(`/pages/registroponto/gestao?${params.toString()}`)
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        }
    }, [pagination.pageIndex])

    // Função para aplicar filtros
    const applyFilters = (row: any) => {
        const globalMatch = !globalFilter || CustomFilter(row, 'global', globalFilter);
        const setorMatch = !setorFilter || row.getValue('setor')?.toLowerCase() === setorFilter.toLowerCase();
        const salaMatch = !salaFilter || row.getValue('sala')?.toLowerCase() === salaFilter.toLowerCase();

        return globalFilter ? globalMatch : (setorFilter || salaFilter) ? (setorMatch && salaMatch) : globalMatch;
    };
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div>
            <div className="flex items-center py-4 space-x-4">
                <Input
                    placeholder="Filtrar por ..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(String(event.target.value))}
                    className="max-w-sm"
                />
                {/* DATA FILTER */}
                <div className={cn("grid gap-2")}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Selecione uma data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                {/* SETOR FILTER */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={Boolean(setorFilter)}
                            className="w-[20rem] justify-between"
                        >
                            {setorFilter || "Selecione o Setor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[20rem] p-0">
                        <Command>
                            <CommandInput placeholder="Pesquisar Setor..." />
                            <CommandList>
                                <CommandEmpty>Setor não encontrado</CommandEmpty>
                                <CommandGroup>
                                    {["Setor 1", "Setor 2", "Setor 3"].map((setor) => (
                                        <CommandItem
                                            key={setor}
                                            onSelect={() => {
                                                setSetorFilter(setor === setorFilter ? "" : setor);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    setor === setorFilter ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {setor}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {/* CARGO FILTER */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={Boolean(salaFilter)}
                            className="w-[20rem] justify-between"
                        >
                            {salaFilter || "Selecione a Sala"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[20rem] p-0">
                        <Command>
                            <CommandInput placeholder="Pesquisar Sala..." />
                            <CommandList>
                                <CommandEmpty>Sala não encontrada</CommandEmpty>
                                <CommandGroup>
                                    {["Telefonista", "Sala 2", "Sala 3"].map((sala) => (
                                        <CommandItem
                                            key={sala}
                                            onSelect={() => {
                                                setSalaFilter(sala === salaFilter ? "" : sala);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    sala === salaFilter ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {sala}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {/* VISUALIZADOS FILTER */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Ocultar exportados
                    </label>
                </div>

            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows
                                .filter(applyFilters) // Aplicando os filtros
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                {loading ?
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Carregando dados...
                                    </TableCell>
                                    :
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Nenhum dado encontrado.
                                    </TableCell>
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                onClick={() => handleGoToPage(1)}
                                className="flex items-center"
                                disabled={Number(page) <= 1}
                            >
                                <ChevronLeft className="size-4" />
                                Primeira Página
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                onClick={() => handlePreviousPage(Number(page).toString())}
                                className="flex items-center"
                                disabled={Number(page) <= 1}
                            >
                                <ChevronLeft className="size-4" />
                                Anterior
                            </Button>
                        </PaginationItem>

                        {Number(page) >= 3 &&
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handleGoToPage(1)}
                                    className=" cursor-pointer"
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                        }
                        {Number(page) >= 4 &&
                            < PaginationItem >
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {Number(page) > 1 &&
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handleGoToPage(Number(page) - 1)}
                                    className=" cursor-pointer"
                                >
                                    {Number(page) - 1}
                                </PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <Button
                                variant={'ghost'}
                                size={'sm'}
                                disabled={true}
                            >
                                {page}
                            </Button>
                        </PaginationItem>
                        {Number(page) < table.getPageCount() - 1 &&
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handleGoToPage(Number(page) + 1)}
                                    className=" cursor-pointer"
                                >
                                    {Number(page) + 1}
                                </PaginationLink>
                            </PaginationItem>
                        }
                        {Number(page) <= table.getPageCount() - 3 &&
                            < PaginationItem >
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {Number(page) < table.getPageCount() &&
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handleGoToPage(table.getPageCount())}
                                    className=" cursor-pointer"
                                >
                                    {table.getPageCount()}
                                </PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                onClick={() => handleNextPage(Number(page).toString())}
                                className="flex items-center"
                                disabled={pagination.pageIndex >= table.getPageCount() - 1}
                            >
                                Próxima
                                <ChevronRight className="size-4" />
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                onClick={() => handleGoToPage(table.getPageCount())}
                                className="flex items-center"
                                disabled={pagination.pageIndex >= table.getPageCount() - 1}
                            >
                                Última Página
                                <ChevronRight className="size-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div >
    );
}
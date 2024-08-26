"use client";
import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type PaginationState, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronsUpDown, MoreHorizontal, Check, ChevronLeft, ChevronRight } from "lucide-react";
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

// Definindo o tipo para os dados dos ramais
export type Ramal = {
    ramal: number;
    setor: string;
    sala: string | null;
    responsavel: string | null;
};

// Colunas da tabela para os dados dos ramais
export const columns: ColumnDef<Ramal>[] = [
    {
        accessorKey: "ramal",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ramal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("ramal")}</div>,
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
        cell: ({ row }) => <div>{row.getValue("setor")}</div>,
    },
    {
        accessorKey: "sala",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sala
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("sala") || "N/A"}</div>,
    },
    {
        accessorKey: "responsavel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Responsável
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("responsavel") || "N/A"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const ramal = row.original;
            const ClipboardRamalText = `ramal: ${ramal.ramal.toString()}, setor: ${ramal.setor.toString()}${ramal.sala && `, sala: ${ramal.sala.toString()}`}${ramal.responsavel && `, responsável: ${ramal.responsavel.toString()}`} `
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ClipboardRamalText)}>
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
    const ramal = row.getValue('ramal')?.toString() || '';
    const setor = row.getValue('setor')?.toLowerCase() || '';
    const sala = row.getValue('sala')?.toLowerCase() || '';
    const responsavel = row.getValue('responsavel')?.toLowerCase() || '';
    const searchTerm = value.toLowerCase();

    return ramal.includes(searchTerm) || setor.includes(searchTerm) || sala.includes(searchTerm) || responsavel.includes(searchTerm);
}

export function RamaisTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [setorFilter, setSetorFilter] = React.useState<string>("");
    const [salaFilter, setSalaFilter] = React.useState<string>("");
    const [ramais, setRamais] = useState<Ramal[]>([]);
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
        router.push(`/pages/ramais?${params.toString()}`)
        console.log(pageIndex)
        console.log(`/pages/ramais?${params.toString()}`)
        console.log(pagination.pageIndex)
        table.setPageIndex(pagination.pageIndex + 1)
    }

    const handlePreviousPage = (pageIndex: any) => {
        if (pageIndex <= 1) {
            return
        }
        const params = new URLSearchParams(searchParams)

        params.set('page', (Number(pageIndex) - 1).toString())
        router.push(`/pages/ramais?${params.toString()}`)
        console.log(pageIndex)
        console.log(`/pages/ramais?${params.toString()}`)
        console.log(pagination.pageIndex)
        table.setPageIndex(pagination.pageIndex - 1)
    }

    const handleGoToPage = (page: any) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', (Number(page)).toString())
        router.push(`/pages/ramais?${params.toString()}`)

        table.setPageIndex(page - 1)
    }

    const data = ramais;

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
        const fetchRamais = async () => {
            try {
                const response = await fetch('/api/ramais');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os ramais');
                }
                const data = await response.json();
                setRamais(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRamais();
    }, []);

    useEffect(() => {
        if (pagination.pageIndex > table.getPageCount()) {
            const params = new URLSearchParams(searchParams)
            params.set('page', ('1'))
            router.push(`/pages/ramais?${params.toString()}`)
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

    return (
        <div>
            <div className="flex items-center py-4 space-x-4">
                <Input
                    placeholder="Filtrar por ..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(String(event.target.value))}
                    className="max-w-sm"
                />

                {/* <Popover>
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
                </Popover> */}
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
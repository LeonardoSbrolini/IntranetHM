"use client";

import * as React from "react";
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Months } from "@/data/monthData";
import { useEffect, useState } from "react";

export interface Aniversariante {
    usuario_id: number;
    usuario_nome: string;
    usuario_dia: number;
    usuario_mes: number;
    usuario_aniversario: string;
    usuario_setor_id: number;
    setor_nome: string;
}

// Colunas da tabela para os dados dos aniversariantes
export const columns: ColumnDef<Aniversariante>[] = [
    {
        accessorKey: "usuario_nome",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("usuario_nome")}</div>,
    },
    {
        accessorKey: "usuario_dia",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Dia
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("usuario_dia")}</div>,
    },
    {
        accessorKey: "usuario_mes",
        header: ({ column }) => (<div>Mês</div>),
        cell: ({ row }) => {
            const mes = row.getValue<number>("usuario_mes");
            return <div>{Months[mes - 1]?.name ?? "Desconhecido"}</div>;
        },
    },
    {
        accessorKey: "setor_nome",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Setor
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("setor_nome")}</div>,
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const aniversariante = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Ações</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(aniversariante.usuario_nome)}
    //                     >
    //                         Copiar Nome
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

export function AniversariantesTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);
    const [filteredAniversariantes, setFilteredAniversariantes] = useState<Aniversariante[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const currentMonth = new Date().getMonth() + 1; // Mês atual
    const [month, setMonth] = useState<number>(currentMonth); // Estado do mês

    // Aplica o filtro de mês e nome/setor
    useEffect(() => {
        const applyFilters = () => {
            let result = aniversariantes;

            // Filtro por mês
            if (globalFilter) {
                const searchTerm = globalFilter.toLowerCase();
                result = result.filter(
                    (aniversariante) =>
                        aniversariante.usuario_nome.toLowerCase().includes(searchTerm) ||
                        aniversariante.setor_nome.toLowerCase().includes(searchTerm)
                );
                setFilteredAniversariantes(result);
                return
            }

            if (month) {
                result = result.filter((aniversariante) => aniversariante.usuario_mes === month);
                setFilteredAniversariantes(result);
                return
            }
        };

        applyFilters();
    }, [month, globalFilter, aniversariantes]);

    const table = useReactTable({
        data: filteredAniversariantes,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    });

    useEffect(() => {
        const fetchAniversariantes = async () => {
            try {
                const response = await fetch('/api/usuarios/aniversariantes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os aniversariantes');
                }
                const data = await response.json();
                setAniversariantes(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchAniversariantes();
    }, []);

    return (
        <div>
            <div className="flex items-center gap-x-4 py-4">
                <Input
                    placeholder="Filtrar por ..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(String(event.target.value))}
                    className="max-w-sm"
                />
                {!globalFilter &&
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !month && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {Months[month - 1].name}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2 gap-4 grid grid-cols-4 flex-wrap text-sm">
                            {Months.map((value) => (
                                <div
                                    key={value.id}
                                    className={`${month === value.id && 'bg-accent'} hover:bg-accent text-accent-foreground size-[2.5rem] flex justify-center items-center rounded-md cursor-pointer`}
                                    onClick={() => setMonth(value.id)}
                                >
                                    {value.name.slice(0, 3)}
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                }
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
                            table.getRowModel().rows.map((row) => (
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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} resultado(s)
                </div>
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próximo
                </Button>
            </div>
        </div>
    );
}

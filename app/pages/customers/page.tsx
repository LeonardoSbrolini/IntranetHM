"use client"
import * as React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ImageIcon, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { customers as data } from "@/data/customers"
import { Customers } from "@/types/customer.type"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import CustomersSheet from "@/components/customersSheet"
import Image from "next/image"
import { format } from 'date-fns'
import { useEffect, useState } from "react"
import { Customer } from "@prisma/client"

// const data: Payment[] = [
//     {
//         id: "m5gr84i9",
//         amount: 316,
//         status: "success",
//         email: "a",
//     },
//     {
//         id: "3u1reuv4",
//         amount: 242,
//         status: "success",
//         email: "b",
//     },
//     {
//         id: "derv1ws0",
//         amount: 837,
//         status: "processing",
//         email: "c",
//     },
//     {
//         id: "5kma53ae",
//         amount: 874,
//         status: "success",
//         email: "d",
//     },
//     {
//         id: "bhqecj4p",
//         amount: 721,
//         status: "failed",
//         email: "e",
//     },
// ]

// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }

// export const columns: ColumnDef<any>[] = [
//     {
//         id: "select",
//         header: ({ table }) => (
//             <Checkbox
//                 checked={
//                     table.getIsAllPageRowsSelected() ||
//                     (table.getIsSomePageRowsSelected() && "indeterminate")
//                 }
//                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }) => (
//             <Checkbox
//                 checked={row.getIsSelected()}
//                 onCheckedChange={(value) => row.toggleSelected(!!value)}
//                 aria-label="Select row"
//             />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "id",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Id
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
//     },
//     {
//         accessorKey: "image",
//         header: '',
//         cell: ({ row }) => {
//             const fullName = row.getValue("name") as string;
//             const nameParts = fullName.split(" ");
//             const firstName = nameParts[0]; // Primeiro nome
//             const lastName = nameParts[nameParts.length - 1]; // Último nome
//             return (
//                 row.getValue("image") ?
//                     <Image alt={`${firstName} ${lastName} Perfil`} className="aspect-square rounded-md object-cover" height="64" src={row.getValue("image")} width="64" /> :
//                     <ImageIcon />
//             )
//         },
//         // <div className="lowercase">{row.getValue("image")}</div>,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "name",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Nome
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "age",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Idade
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue("age")}</div>,
//     },
//     {
//         accessorKey: "cpf",
//         header: "CPF",
//         cell: ({ row }) => <div className="lowercase">{row.getValue("cpf")}</div>,
//     },
//     {
//         accessorKey: "cep",
//         header: "CEP",
//         cell: ({ row }) => <div className="lowercase">{row.getValue("cep")}</div>,
//     },
//     {
//         accessorKey: "phone",
//         header: "Telefone",
//         cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
//     },
//     {
//         accessorKey: "sex",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Sexo
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue("sex") == 'M' ? 'Masculino' : 'Feminino'}</div>,
//     },
//     {
//         accessorKey: "createAt",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Data criação
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => {
//             const dateValue = row.getValue("createAt") as string;
//             const dateObject = new Date(dateValue);
//             // Adiciona 3 horas ao horário para ficar padrão Brasília
//             dateObject.setHours(dateObject.getHours() + 3);
//             // Formata a data no padrão DD/MM/YYYY
//             const formattedDate = format(dateObject, "dd/MM/yyyy");
//             return <div className="lowercase">{formattedDate}</div>;
//         },
//     },
//     {
//         accessorKey: "status",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Status
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
//     },
//     {
//         id: "actions",
//         enableHiding: false,
//         header: "Ações",
//         cell: ({ row }) => {
//             const customer = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <Sheet>
//                             <SheetTrigger asChild>
//                                 <Button variant="ghost" className="w-full justify-start px-2 font-normal">
//                                     Visualizar cliente
//                                 </Button>
//                             </SheetTrigger>
//                             <CustomersSheet customer={customer} />
//                         </Sheet>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem disabled onClick={() => navigator.clipboard.writeText(customer.id.toString())}>
//                             Enviar mensagem whatsapp
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]

export default function CustomersPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [customers, setCustomers] = useState<any[] | null>(null);

    async function teste(event: any) {
        console.log(event)

        const res = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ title: 'agora funcionou' }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log('RESPOSTA', res)
    }


    // const table = useReactTable({
    //     data,
    //     columns,
    //     onSortingChange: setSorting,
    //     onColumnFiltersChange: setColumnFilters,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onColumnVisibilityChange: setColumnVisibility,
    //     onRowSelectionChange: setRowSelection,
    //     state: {
    //         sorting,
    //         columnFilters,
    //         columnVisibility,
    //         rowSelection,
    //     },
    // })

    return (
        <div className="w-full">
            <button onClick={() => teste('oi')}>
CLICAR AQUI
            </button>
            {/* <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar clientes"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
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
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) afetadas.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div> */}
        </div>
    )
}

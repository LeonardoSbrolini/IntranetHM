"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { ImageIcon, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProductsSheet from "@/components/productsSheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular os índices dos itens para a página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Função para mudar de página
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>

      <Card>
        <CardHeader className="grid grid-cols-3">
          <div className="grid col-span-2">
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products and view their sales performance.</CardDescription>
          </div>
          <div className="grid col-span-1 justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full justify-start px-2">
                  <Plus />
                  Adicionar novo produto
                </Button>
              </SheetTrigger>
              <ProductsSheet />
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell ">
                    {product && product.image ?
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={product.image} width="64" /> :
                      <ImageIcon />
                    }
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">R$ {(product?.price as any / 100).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={product.status == 'ativo' ? 'success' : 'destructive'}>{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start px-2">
                              <Pencil className="scale-[60%]" />
                              Edit
                            </Button>
                          </SheetTrigger>
                          <ProductsSheet product={product} />
                        </Sheet>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start px-2 hover:bg-red-400 hover:text-white">
                              <Trash className="scale-[60%]" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem certeza disso ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja deletar o produto: <b>{product.name}</b> ?
                                Após isso não será mais possível voltar atrás.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{indexOfFirstItem + 1}-{indexOfLastItem}</strong> of <strong>{products.length}</strong> products
          </div>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationPrevious
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={currentPage === 1 ? 'disabled' : ''}
              />
              {Array.from({ length: totalPages }, (_, number) => (
                <PaginationItem key={number + 1}>
                  <PaginationLink
                    isActive={currentPage === number + 1}
                    onClick={() => paginate(number + 1)}
                    className={currentPage === number + 1 ? 'active' : ''}
                  >
                    {number + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                className={currentPage === totalPages ? 'disabled' : ''}
              />
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      {/*  */}
    </>
  )
}
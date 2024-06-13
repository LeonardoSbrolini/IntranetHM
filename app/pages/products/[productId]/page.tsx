"use client"
import Image from "next/image"
import { ChevronLeft, PlusCircle, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { productVariants as arrayProductVariants } from "@/data/productVariants"
import { products as arrayProducts } from "@/data/products"
import { productType } from "@/data/productType"
import { ComboBox } from "@/components/combobox"
import { productStatus } from "@/data/productStatus"
import { product } from "@/types/product.type"

interface OrderDetailsPageProps {
    params: { productId: number };
}

export default function ProductDetailsPage({ params }: OrderDetailsPageProps) {
    const [product, setProduct] = useState<product | undefined>(undefined)

    const [productsVariants, setProductsVariants] = useState<any[]>([])
    const [selectedVariant, setSelectedVariant] = useState<any>(null)

    const [ready, setReady] = useState(false)

    const fetchData = async () => {
        const variants = await arrayProductVariants.filter(productVariants => productVariants.product_id == params.productId);
        setProductsVariants(variants);
        const productsData = await arrayProducts.find(products => products.id == params.productId);
        setProduct(productsData);
    };

    useEffect(() => {
        fetchData();
        setReady(true)
        console.log('products: ', product)
    }, []);

    if (!ready || !product) {
        return (<p>Carregando...</p>)
    }

    return (
        <div className="grid flex-1 auto-rows-max gap-4">
            {/* Header*/}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {product.name}
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
            {/* Content Page*/}
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                {/* Variants Card */}
                <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                        <CardTitle>Variações</CardTitle>
                        <CardDescription>
                            Variações do(a) {product.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productsVariants.map((variant: any) => (
                                    <TableRow key={variant.id} onClick={() => setSelectedVariant(variant)} className='cursor-pointer'>
                                        <TableCell className="font-semibold">
                                            {variant.name} {variant.amount}
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor="price-1" className="sr-only">
                                                Preço
                                            </Label>
                                            <Input
                                                id="price-1"
                                                type="number"
                                                defaultValue={(variant.price / 100).toFixed(2)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor="amount" className="sr-only">
                                                Quantidade
                                            </Label>
                                            <Input
                                                id="amount"
                                                type="text"
                                                defaultValue={variant.amount}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor="type" className="sr-only">
                                                tipo
                                            </Label>
                                            <ComboBox
                                                placeholder="Tipo"
                                                data={variant && variant.type ? variant.type : ''}
                                                options={productType} className='w-full' />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor="status" className="sr-only">
                                                Status
                                            </Label>
                                            <ComboBox
                                                placeholder="Status"
                                                data={variant && variant.status ? variant.status : ''}
                                                options={productStatus} className='w-full' />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                        <Button size="sm" variant="ghost" className="gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            Adicionar variação
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* Dinamic Render (Selected Variant) */}
            {selectedVariant &&
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <div className="grid  items-start text-center gap-4 lg:col-span-3 lg:gap-8 space-y-1.5 p-6">
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Variação selecionada: {selectedVariant.name} {selectedVariant.amount} {selectedVariant.type}</h2>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        {/* Details Card */}
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Detalhes do Produto</CardTitle>
                                <CardDescription>

                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue={selectedVariant.name}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            defaultValue={selectedVariant.description}
                                            className="min-h-32"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Category Card */}
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Product Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="category"
                                                aria-label="Select category"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="accessories">
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="subcategory">
                                            Subcategory (optional)
                                        </Label>
                                        <Select>
                                            <SelectTrigger
                                                id="subcategory"
                                                aria-label="Select subcategory"
                                            >
                                                <SelectValue placeholder="Select subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                                <SelectItem value="sweatshirts">
                                                    Sweatshirts
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Status Card */}
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Product Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>
                                        <Select>
                                            <SelectTrigger id="status" aria-label="Select status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Active</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                        {/* Image Card */}
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square w-full rounded-md object-cover"
                                        height="300"
                                        src="/placeholder.svg"
                                        width="300"
                                    />
                                    <div className="grid grid-cols-3 gap-2">
                                        <button>
                                            <Image
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="84"
                                                src="/placeholder.svg"
                                                width="84"
                                            />
                                        </button>
                                        <button>
                                            <Image
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="84"
                                                src="/placeholder.svg"
                                                width="84"
                                            />
                                        </button>
                                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Upload</span>
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Archive Card */}
                        <Card x-chunk="dashboard-07-chunk-5">
                            <CardHeader>
                                <CardTitle>Archive Product</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div></div>
                                <Button size="sm" variant="secondary">
                                    Archive Product
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            }
            {/* Footer Mobile */}
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Product</Button>
            </div>
        </div>
    );
}
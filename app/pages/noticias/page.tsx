import BlogCard from "@/components/blogCard";
import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { blogData } from "@/data/blogData";

export default function BlogPage() {
    // Ordena por número de visualizações (do maior para o menor)
    const popularPosts = [...blogData].sort((a, b) => b.view - a.view).slice(0, 1);

    // Ordena por data de publicação (do mais recente para o mais antigo)
    const recentPosts = [...blogData].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()).slice(0, 5);

    return (
        <Container>
            <Breadcrumb title="Blog" subtitle="Notícias sobre o Hospital Municipal" />
            <div className="flex flex-col 2xl:flex-row w-full gap-6">
                {/* O item com id=2 será exibido primeiro em telas menores */}
                <div className="order-2 2xl:order-1 2xl:basis-[70%] w-full">
                    <div className="text-2xl pb-4 font-bold text-center">
                        Publicações
                    </div>
                    <div className="grid gap-y-8 justify-between grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 justify-items-center mb-6">
                        {blogData.map(post => (
                            <BlogCard key={post.id} title={post.title} autor={post.author} published={post.published} view={post.view} post={post.post} isNew={post.isNew} img={post.img} id={post.id} variant={'medium'} />
                        ))}
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                {/* O item com id=1 será exibido por último em telas menores */}
                <div className="order-1 xl:grid xl:grid-cols-2 xl:gap-4 2xl:grid-cols-1 2xl:order-2 2xl:basis-[30%] w-full" id="3">
                    <div>
                        <div className="text-2xl pb-4 font-bold">
                            Popular
                        </div>
                        <div className="flex flex-col gap-4">
                            {popularPosts.map(post => (
                                <BlogCard key={post.id} title={post.title} autor={post.author} published={post.published} view={post.view} post={post.post} isNew={post.isNew} img={post.img} id={post.id} variant={'large'} />
                            ))}
                        </div>
                    </div>
                    <div id="5" className="">
                        <div className="text-xl pb-4 pt-6 font-bold">
                            Últimas publicações
                        </div>
                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
                            {recentPosts.map(post => (
                                <BlogCard key={post.id} title={post.title} autor={post.author} published={post.published} view={post.view} post={post.post} isNew={post.isNew} img={post.img} id={post.id} variant={'small'} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </Container>
    );
}

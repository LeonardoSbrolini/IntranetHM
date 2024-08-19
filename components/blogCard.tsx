import { Card } from "@/components/ui/card";
import { Activity, Clock, Flame, ImageIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BlogCardProps {
    id: number;
    title: string;
    autor: string;
    published: string;
    post: string;
    img?: string;
    view?: number;
    isNew?: boolean;
    variant: 'small' | 'medium' | 'large';
}

export default function BlogCard({ title, autor, published, view, post, isNew, img, id, variant }: BlogCardProps) {
    return (
        <>
            {variant === "small" && (
                <div className="w-full flex gap-4 hover:cursor-pointer">
                    <div className={`basis-[20%] h-[5rem] relative overflow-hidden ${!img && 'border-2 border-gray-400 border-dashed'} flex justify-center items-center`}>
                        {img ? (
                            <Image
                                src={img}
                                alt={`Image post ${title}`}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        ) : (
                            <ImageIcon className="text-gray-400 scale-[1.5]" />
                        )}
                    </div>
                    <div className="basis-[80%] flex flex-col justify-between">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-medium">{published}</p>
                    </div>
                </div>
            )}

            {variant === 'medium' && (
                <Card className="w-[20rem] border-none bg-transparent shadow-none relative">
                    {isNew && <div className="py-2 px-2 absolute m-4 bg-white flex font-semibold rounded-md z-20"> Novo post</div>}
                    <div className={`relative h-[15rem] w-full overflow-hidden ${!img && 'border-2 border-gray-400 border-dashed'} flex justify-center items-center`}>
                        {img ? (
                            <Image
                                src={img}
                                alt={`Image post ${title}`}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                            />
                        ) : (
                            <ImageIcon className="text-gray-400 scale-[3]" />
                        )}
                    </div>
                    <div className="flex w-full flex-col items-start gap-2 text-sm py-4">
                        <h2 className="text-xl">{title}</h2>
                        <div className="flex w-full">
                            <p className="basis-[40%] flex"><User className="" />{autor}</p>
                            <p className="basis-[40%] flex"><Clock className="scale-75" />{published}</p>
                            <p className="basis-[20%] flex"><Activity className="scale-75" />{view} visualizações</p>
                        </div>
                        <p className="line-clamp-3">{post}</p>
                    </div>
                    <div className="w-full flex justify-start">
                        <Button>Leia Mais</Button>
                    </div>
                </Card>
            )}

            {variant === 'large' && (
                <Card className="w-full border-none bg-transparent shadow-none relative hover:cursor-pointer">
                    <div className="h-[20rem] w-full bg-slate-800">
                        <Image
                            src={img || '/image/blog/default.jpg'} // Use a default image if img is not provided
                            alt={`Image post ${title}`}
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0"
                        />
                    </div>
                    <div className="flex w-full flex-col items-start gap-2 text-sm py-4 text-white absolute bottom-0 px-4">
                        <p className="flex">{published}</p>
                        <h2 className="text-xl">{title}</h2>
                    </div>
                </Card>
            )}
        </>
    );
}

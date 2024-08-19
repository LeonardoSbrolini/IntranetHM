import Image from "next/image";
import Link from "next/link";

interface AtalhoCardProps {
    title: string;
    redirect: string;
    img: string;
}

export default function AtalhoCard({ title, redirect, img }: AtalhoCardProps) {
    return (
        <Link href={redirect} target="_blank" className="w-[12rem] h-[12rem] flex flex-col shadow-lg border hover:scale-110 duration-300">
            <div  className="relative w-full basis-[80%] flex justify-center items-center">
                <Image
                    src={img}
                    alt={`Image ${title}`}
                    layout="fill"
                    objectFit="contain"
                    className="absolute inset-0 p-2"
                />
            </div>
            <div className="w-full basis-[20%] flex justify-center items-center font-semibold">
                {title}
            </div>
        </Link>
    )
}
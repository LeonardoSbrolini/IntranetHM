import AtalhoCard from "@/components/atalhoCard";
import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { atalhos } from "@/data/atalhosData";

export default function AtalhosPage() {

    return (
        <Container>
            <Breadcrumb title="Atalhos" subtitle="Acesso rápido para todos os atalhos." />

            <div className="w-full h-full flex justify-center flex-wrap gap-6 pt-10">

                {atalhos.map((atalho, index) => (
                    <AtalhoCard key={index} title={atalho.title} redirect={atalho.redirect} img={atalho.img}/>
                ))}

            </div>
        </Container>
    )
}
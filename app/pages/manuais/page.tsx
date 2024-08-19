import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import Sidebar from "@/components/sidebar";

export default function ManuaisPage() {
    return (
        <Container>
            <Breadcrumb title="Manuais" subtitle="Tire suas dúvidas com nossos manuais." />

            <div className="flex pt-10">
                <div className="basis-[20%] border-2">
                    <Sidebar />
                </div>
                <div className="basis-[80%] border-2">e</div>
            </div>
        </Container>
    )
}
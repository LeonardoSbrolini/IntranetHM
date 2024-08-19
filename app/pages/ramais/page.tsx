import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { RamaisTable } from "@/components/dataTables/ramaisTable";

export default function RamaisPage() {
    return (
        <Container>
            <Breadcrumb title="Ramais" subtitle="Encontre os ramais do Hospital Municipal" />

            <div className="w-full pb-10">
                <RamaisTable />
            </div>
        </Container>
    )
}
import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { AniversariantesTable } from "@/components/dataTables/aniversariantesTable";

export default function AniversariantesPage() {
    return (
        <Container>
            <Breadcrumb title="Aniversariantes" subtitle="" />
            
            <div className="w-full pb-10">
                <AniversariantesTable />
            </div>
        </Container>
    )
}
import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { IdeiaPremiadaTable } from "@/components/dataTables/ideiapremiadaTable";

export default function MinhasIdeiasPage() {
    return (
        <Container>
            <Breadcrumb title="Minhas ideias" subtitle="Visualize as ideias que você encaminhou." />

            <div className="w-full pb-10">
                <IdeiaPremiadaTable />
            </div>
        </Container>
    )
}
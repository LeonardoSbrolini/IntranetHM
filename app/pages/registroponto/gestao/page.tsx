import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/container";
import { RegistroPontoTable } from "@/components/dataTables/registroPonto";

export default function GestaoRegistroPontoPage() {
  return (
    <Container>

      <Breadcrumb title="Minhas ideias" subtitle="Visualize as ideias que você encaminhou." />

      <div className="w-full pb-10">
        <RegistroPontoTable />
      </div>

    </Container>
  )
}
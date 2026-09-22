import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-tree-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasTreeDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
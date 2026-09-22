import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-villa-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasVillaDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
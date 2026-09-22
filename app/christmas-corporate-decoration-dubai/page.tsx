import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-corporate-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasCorporateDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
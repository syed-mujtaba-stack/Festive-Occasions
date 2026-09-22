import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-office-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasOfficeDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
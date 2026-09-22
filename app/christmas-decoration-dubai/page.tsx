import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
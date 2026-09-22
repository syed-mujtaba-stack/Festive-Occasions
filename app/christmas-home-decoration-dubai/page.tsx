import {
  getServicePage,
} from "@/lib/service-pages";
import {
  servicePageMetadata,
  ServicePageTemplate,
} from "@/components/services/service-page";

const page = getServicePage("christmas-home-decoration-dubai")!;

export const metadata = servicePageMetadata(page);

export default function ChristmasHomeDecorationDubaiPage() {
  return <ServicePageTemplate page={page} />;
}
import { createFeaturePage } from "@/lib/content/create-feature-page";

const { generateMetadata, Page, generateStaticParams } = createFeaturePage("fantasies");
export { generateMetadata, generateStaticParams };
export default Page;

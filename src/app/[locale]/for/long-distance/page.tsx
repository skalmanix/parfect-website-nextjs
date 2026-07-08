import { createFeaturePage } from "@/lib/content/create-feature-page";

const { generateMetadata, Page, generateStaticParams } = createFeaturePage("forLongDistance");
export { generateMetadata, generateStaticParams };
export default Page;

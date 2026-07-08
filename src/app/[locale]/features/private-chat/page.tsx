import { createFeaturePage } from "@/lib/content/create-feature-page";

const { generateMetadata, Page, generateStaticParams } = createFeaturePage("privateChat");
export { generateMetadata, generateStaticParams };
export default Page;

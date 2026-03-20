"use client";

import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import { usePathname } from "next/navigation";

// ✅ Props type
type SeoMetaProps = {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
};

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}: SeoMetaProps) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname();

  // ✅ final computed values (clean & reusable)
  const finalTitle = plainify(
    meta_title || title || config.site.title
  );

  const finalDescription = plainify(
    description || meta_description
  );

  const finalImage = `${base_url}${image || meta_image}`;

  const finalUrl = `${base_url}/${pathname.replace("/", "")}`;

  return (
    <>
      {/* title */}
      <title>{finalTitle}</title>

      {/* canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* basic meta */}
      <meta name="description" content={finalDescription} />
      <meta name="author" content={meta_author} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SeoMeta;
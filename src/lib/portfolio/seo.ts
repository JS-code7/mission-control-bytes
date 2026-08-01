export const SITE_URL = "https://mission-control-bytes.lovable.app";

export const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa0680b6-ec93-4085-8e86-2c3c97beb984/id-preview-895940f8--fbf92f56-349b-44b4-a463-a2930587839f.lovable.app-1781843216704.png";

type PageSeo = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "profile" | "article";
};

/**
 * Builds a per-route head(): title, description, and Open Graph tags.
 * No canonical, Twitter, or structured-data tags.
 */
export function pageHead({ path, title, description, type = "website" }: PageSeo) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
    ],
  };
}

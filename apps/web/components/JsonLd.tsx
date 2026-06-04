export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://chapterrealestate.ca/#organization",
        name: "Chapter Real Estate",
        url: "https://chapterrealestate.ca",
        logo: "https://chapterrealestate.ca/logo.png",
        description:
          "Chapter Real Estate is Winnipeg's full-service real estate company offering brokerage, property management, and investment development services.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Winnipeg",
          addressRegion: "MB",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "City",
          name: "Winnipeg",
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://chapterrealestate.ca/#website",
        url: "https://chapterrealestate.ca",
        name: "Chapter Real Estate",
        publisher: {
          "@id": "https://chapterrealestate.ca/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

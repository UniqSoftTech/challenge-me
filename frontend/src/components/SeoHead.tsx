import Head from "next/head";

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<HeadProps> = ({
  title = "Challenge Me",
  description = "Challenge Me",
  keywords = "Challenge Me",
  ogTitle = "Challenge Me",
  ogDescription = "Challenge Me",
  ogImage = "",
  twitterTitle = "Challenge Me",
  twitterDescription = "https://x.com/",
  twitterImage = "",
  canonicalUrl = "https://uniqsoft.tech/",
}) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#fff" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        <meta name="twitter:image" content={twitterImage} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
    </>
  );
};

export default SEOHead;

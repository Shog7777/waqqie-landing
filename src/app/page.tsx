import { Faq } from "@/components/site/faq";
import { Features } from "@/components/site/features";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { Navbar } from "@/components/site/navbar";
import { Pricing } from "@/components/site/pricing";
import { Showcase } from "@/components/site/showcase";
import { Testimonials } from "@/components/site/testimonials";
import { TrustBar } from "@/components/site/trust-bar";
import { faqs, site } from "@/lib/content";

/** بيانات منظّمة تساعد محركات البحث على فهم التطبيق وأسئلته. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      name: site.name,
      alternateName: site.latin,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android",
      inLanguage: "ar",
      description: site.description,
      url: site.url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "SAR",
        description: "باقة أساسية مجانية مع اشتراك Pro اختياري",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <Showcase />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}

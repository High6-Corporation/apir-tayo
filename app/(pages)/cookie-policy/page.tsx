import { Navigation } from "@/app/components/navigation/Navigation";
import { Footer } from "@/app/components/sections/homepage/Footer";
import { CookiePolicyContent } from '@/app/components/consent/CookiePolicyContent';
import type { Metadata } from 'next';

const bannerBg = '/images/subpages-banner.jpg';

export const metadata: Metadata = {
  title: 'Cookie Policy | ARTa Philippines',
  description: 'Cookie policy for ARTa Artist Atelier Philippines.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>

        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="w-[90%] mx-auto max-w-[1316px]">
            <CookiePolicyContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

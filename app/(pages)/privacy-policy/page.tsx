import { Navigation } from '@/app/components/navigation/Navigation';
import { Footer } from '@/app/components/sections/homepage/Footer';
import { PrivacyPolicyContent } from '@/app/components/consent/PrivacyPolicyContent';
import type { Metadata } from 'next';

const bannerBg = '/images/subpages-banner.jpg';

export const metadata: Metadata = {
  title: 'Privacy Policy | ARTa Philippines',
  description: 'Privacy policy for ARTa Artist Atelier Philippines.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>

        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="w-[90%] mx-auto max-w-[1316px]">
            <PrivacyPolicyContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

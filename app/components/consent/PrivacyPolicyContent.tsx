export function PrivacyPolicyContent() {
  return (
    <div className="max-w-[900px] mx-auto font-body text-brand-text space-y-8">
      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Introduction</h2>
        <p className="text-base md:text-lg leading-relaxed">
          We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
        </p>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Information We Collect</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
          <li>Personal identification information (name, email address, phone number) when you contact us or submit a form</li>
          <li>Usage data including how you interact with our website</li>
          <li>Technical data such as IP address, browser type, and device information</li>
          <li>Cookie and consent preferences stored locally in your browser</li>
        </ul>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">How We Use Your Information</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our services or policies</li>
          <li>To provide customer support</li>
          <li>To gather analysis and improve our website and services</li>
          <li>To send marketing communications (only with your explicit consent)</li>
        </ul>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Cookies and Consent</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Our website uses a cookie consent system that allows you to control which types of cookies and third-party services are active. We categorize cookies into:
        </p>
        <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
          <li><strong>Necessary:</strong> Required for the website to function properly. These cannot be disabled.</li>
          <li><strong>Analytics:</strong> Help us understand website traffic and user behavior (e.g., Google Analytics).</li>
          <li><strong>Marketing:</strong> Used for ads, remarketing, and conversion tracking (e.g., Meta Pixel).</li>
          <li><strong>Preferences:</strong> Save user preferences such as language or display settings.</li>
          <li><strong>Embedded Content:</strong> Allow third-party content like YouTube videos, Google Maps, and forms.</li>
        </ul>
        <p className="text-base md:text-lg leading-relaxed mt-4">
          Your consent choices are stored in your browser&apos;s local storage and automatically expire after 365 days, at which point you will be asked to provide consent again. You can change your preferences at any time by clicking the cookie icon on the bottom-left of the page.
        </p>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Third-Party Services</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Depending on your consent choices, the following third-party services may be active:
        </p>
        <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
          <li><strong>Google Analytics:</strong> Collects anonymized usage data to help us improve the website.</li>
          <li><strong>Meta Pixel:</strong> Tracks conversions and helps measure ad performance on Meta platforms.</li>
          <li><strong>YouTube / Google Maps:</strong> Embedded content that may set cookies when loaded.</li>
        </ul>
        <p className="text-base md:text-lg leading-relaxed mt-4">
          These services are only loaded after you grant the corresponding consent. No third-party tracking scripts run without your permission.
        </p>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Data Protection</h2>
        <p className="text-base md:text-lg leading-relaxed">
          We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Your Rights</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Withdraw consent at any time (via the cookie settings icon)</li>
          <li>Object to processing of your personal data</li>
          <li>Request data portability</li>
        </ul>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Data Retention</h2>
        <p className="text-base md:text-lg leading-relaxed">
          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected. Cookie consent preferences are stored locally in your browser and expire after 365 days.
        </p>
      </div>

      <div>
        <h2 className="font-heading italic text-2xl md:text-3xl text-brand-primary mb-4">Changes to This Policy</h2>
        <p className="text-base md:text-lg leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "../navbar";

const TermsAndPolicy: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
        <p className="text-lg mb-4">
          Your website's Terms of Service goes here. It should include
          information about what services you provide, what behaviors are
          prohibited on your website, how you handle user data, and what happens
          in the event of a dispute between you and a user.
        </p>

        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-lg mb-4">
          Your website's Privacy Policy goes here. It should include information
          about what data you collect from users, how you use that data, how you
          store and protect that data, and how users can control their data.
        </p>

        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <p className="text-lg mb-4">
          These terms and conditions ("Terms") govern your use of our website
          ("Website") and any services provided through the Website. By
          accessing or using the Website, you agree to these Terms. If you do
          not agree with these Terms, you should not use the Website.
        </p>
        <h3 className="text-xl font-bold mb-2">Intellectual Property</h3>
        <p className="text-lg mb-4">
          All content, trademarks, logos, and other intellectual property on the
          Website are owned or licensed by us. You may not use, reproduce, or
          distribute any content from the Website without our prior written
          permission.
        </p>

        <h3 className="text-xl font-bold mb-2">Use of the Website</h3>
        <p className="text-lg mb-4">
          You agree to use the Website only for lawful purposes and in a manner
          that does not infringe the rights of others. You must not use the
          Website in any way that could damage, disable, overburden, or impair
          the Website or interfere with any other party's use of the Website.
        </p>

        {/* Add other sections from Terms and Conditions here */}

        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="text-lg mb-4">
          The information provided in these Terms of Service and Privacy Policy
          is for general informational purposes only. We make no representations
          or warranties of any kind, express or implied, about the completeness,
          accuracy, reliability, suitability, or availability with respect to
          the website or the information, products, services, or related
          graphics contained on the website for any purpose.
        </p>

        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
        <p className="text-lg mb-4">
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of,
          or in connection with, the use of this website.
        </p>

        <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
        <p className="text-lg mb-4">
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction]. Any disputes relating to these Terms
          shall be subject to the exclusive jurisdiction of the courts of [Your
          Jurisdiction].
        </p>

        <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
        <p className="text-lg mb-4">
          We reserve the right to modify or update these Terms at any time
          without prior notice. Your continued use of the Website after any
          changes to these Terms constitutes your acceptance of the revised
          Terms.
        </p>
      </div>
    </div>
  );
};

export default TermsAndPolicy;

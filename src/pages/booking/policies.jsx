import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  CheckCircle,
  Groups,
  AccessTime,
  HighlightOff,
  Deck,
  SevereCold,
  PrivacyTip,
  Info,
  Security,
  Gavel
} from "@mui/icons-material";

const PolicyTextItem = ({ text }) => {
  if (!text || !text.trim()) {
    return <p className="text-sm text-gray-500">Not specified.</p>;
  }
  const lines = text.split('\n')
    .map(line => line.trim().replace(/^[^a-zA-Z0-9]+/, '').trim())
    .filter(line => line);

  return (
    <ul className="list-disc list-inside space-y-1">
      {lines.map((line, index) => (
        <li key={index} className="text-sm text-gray-600">{line}</li>
      ))}
    </ul>
  );
};

const StatusChip = ({ status }) => {
  const isAllowed = status === "Allowed" || status === "Accepted";
  const bgColor = isAllowed ? "bg-green-100" : "bg-red-100";
  const textColor = isAllowed ? "text-green-700" : "text-red-700";
  const Icon = isAllowed ? CheckCircle : HighlightOff;

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </div>
  );
};

const Policies = () => {
  const location = useLocation();
  const { hotelData, policies } = location.state || {};
  const navigate = useNavigate();

  const mainPolicy = useMemo(() => (policies ? policies[0] : {}), [policies]);

  const groupedTariffs = useMemo(() => {
    const groups = { on: [], off: [] };
    if (!mainPolicy) return groups;
    const formatTitle = (key) =>
      key
        .replace(/^(on|off)/, "")
        .replace(/(Ap|MAp)$/, "")
        .replace(/([A-Z])/g, " $1")
        .trim();

    for (const key in mainPolicy) {
      if (key.toLowerCase().includes("sharing") || key.toLowerCase().includes("bulk")) {
        const season = key.startsWith("on") ? "on" : "off";
        groups[season].push({
          key,
          title: formatTitle(key),
          policies: mainPolicy[key],
        });
      }
    }
    return groups;
  }, [mainPolicy]);

  if (!hotelData || !policies) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            Policy Data Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            <ArrowBack className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <ArrowBack className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {hotelData?.hotelName}
            </h1>
            <p className="text-sm text-gray-500">Policies & Privacy Information</p>
          </div>
        </div>

        <div className="space-y-6">
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <div className="flex items-center mb-3">
                  <AccessTime className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="font-medium text-gray-700">Check-in/out Times</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Check-in:</span>
                    <span className="font-medium">{mainPolicy.checkInPolicy?.split('\n')[1]?.trim() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Check-out:</span>
                    <span className="font-medium">{mainPolicy.checkOutPolicy?.split('\n')[1]?.trim() || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Groups className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="font-medium text-gray-700">Guest Policies</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { key: "localId", title: "Local ID", value: hotelData.localId },
                    { key: "unmarriedCouplesAllowed", title: "Unmarried Couples", value: mainPolicy.unmarriedCouplesAllowed },
                    { key: "petsAllowed", title: "Pets", value: mainPolicy.petsAllowed },
                    { key: "bachelorAllowed", title: "Bachelors", value: mainPolicy.bachelorAllowed },
                    { key: "smokingAllowed", title: "Smoking", value: mainPolicy.smokingAllowed },
                    { key: "alcoholAllowed", title: "Alcohol", value: mainPolicy.alcoholAllowed },
                    { key: "internationalGuestAllowed", title: "International Guests", value: mainPolicy.internationalGuestAllowed },
                  ].map((p) => (
                    <div key={p.key} className="flex justify-between items-center text-sm">
                      <span>{p.title}:</span>
                      <StatusChip status={p.value} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Rules</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Hotel Rules</h3>
                <PolicyTextItem text={mainPolicy.hotelsPolicy} />
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Cancellation Policy</h3>
                <PolicyTextItem text={mainPolicy.cancellationPolicy} />
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Refund Policy</h3>
                <PolicyTextItem text={mainPolicy.refundPolicy} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tariffs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <div className="flex items-center mb-3">
                  <Deck className="w-5 h-5 text-orange-500 mr-2" />
                  <h3 className="font-medium text-gray-700">On Season</h3>
                </div>
                <div className="space-y-3">
                  {groupedTariffs.on.map((t) => (
                    <div key={t.key} className="border border-gray-200 rounded p-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">{t.title}</h4>
                      <PolicyTextItem text={t.policies} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <SevereCold className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-700">Off Season</h3>
                </div>
                <div className="space-y-3">
                  {groupedTariffs.off.map((t) => (
                    <div key={t.key} className="border border-gray-200 rounded p-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">{t.title}</h4>
                      <PolicyTextItem text={t.policies} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-6">
              <PrivacyTip className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Privacy Policy</h2>
            </div>
            
            <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm">
                <p className="font-semibold text-blue-800">Last Updated: December 16, 2025</p>
                <p className="mt-1">Happy Hotel Stay Service ("we," "us," or "our") is committed to protecting your privacy.</p>
              </div>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                  <Info className="w-5 h-5 mr-2 text-gray-400" />
                  1. Information We Collect
                </h3>
                <div className="space-y-3 pl-7">
                  <p><span className="font-medium text-gray-800">Personal Data:</span> Personally identifiable information (name, email, mobile number) given voluntarily during registration.</p>
                  <p><span className="font-medium text-gray-800">Partner Data:</span> For hotels/agents, we collect business name, address, registration documents, and bank details.</p>
                  <p><span className="font-medium text-gray-800">Booking Information:</span> Travel dates, accommodations, cab/tour details, and payment history.</p>
                  <p><span className="font-medium text-gray-800">Derivative Data:</span> Server logs including IP address, browser type, and access times.</p>
                  <p><span className="font-medium text-gray-800">Financial Data:</span> Limited payment information; full details are secured by our payment processor.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                  <Gavel className="w-5 h-5 mr-2 text-gray-400" />
                  2. How We Use Your Information
                </h3>
                <ul className="list-disc pl-12 space-y-1">
                  <li>Create and manage your user account.</li>
                  <li>Process bookings, payments, and facilitate partner communication.</li>
                  <li>Provide customer support and respond to inquiries.</li>
                  <li>Analyze usage trends and improve platform performance.</li>
                  <li>Prevent fraudulent transactions and protect security.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                  <Security className="w-5 h-5 mr-2 text-gray-400" />
                  3. Disclosure of Your Information
                </h3>
                <div className="space-y-3 pl-7">
                  <p><span className="font-medium text-gray-800">By Law:</span> Disclosed if required for legal processes or protection of rights.</p>
                  <p><span className="font-medium text-gray-800">Service Providers:</span> Shared with third parties performing tasks like hosting or payment processing.</p>
                  <p><span className="font-medium text-gray-800">Partners:</span> Personal details shared with hotels to complete your reservation.</p>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">4. Data Security</h4>
                  <p className="text-sm leading-relaxed">We use administrative, technical, and physical security measures. While we take reasonable steps, no digital transmission is 100% impenetrable.</p>
                </section>
                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">5. Your Rights</h4>
                  <p className="text-sm leading-relaxed">You may review, change, or terminate your account at any time. Opt-out options are available for marketing communications.</p>
                </section>
              </div>

              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">9. Contact Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Company Name</p>
                    <p className="text-gray-900 font-medium">Happy Hotel Stay Service</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Email Support</p>
                    <p className="text-blue-600 font-medium underline">info@hotelroomsstay.com</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Address</p>
                    <p className="text-gray-900 font-medium italic">Agra Rd, ADA Bank Colony, Aligarh, Uttar Pradesh 202001</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Policies;
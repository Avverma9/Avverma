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
} from "@mui/icons-material";

// Helper for bulleted lists
const PolicyTextItem = ({ text }) => {
  if (!text || !text.trim()) {
    return <p className="text-sm text-gray-500">Not specified.</p>;
  }
  // Split by newline, then remove any leading special characters (like •, ➤, etc.) and trim.
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

// Helper for status chips
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

// Main Component
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
        
        {/* Header */}
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
            <p className="text-sm text-gray-500">Policies & House Rules</p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Key Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Timings */}
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

              {/* Guest Policies */}
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

          {/* Property Rules */}
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

          {/* Tariffs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tariffs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* On Season */}
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

              {/* Off Season */}
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

        </div>
      </div>
    </div>
  );
};

export default Policies;

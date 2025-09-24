import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  CheckCircle,
  Gavel,
  Groups,
  Payments,
  AccessTime,
  Cancel,
  HighlightOff,
  Deck,
  Info,
  SevereCold,
} from "@mui/icons-material";

// Helper for bulleted lists
const PolicyTextItem = ({ text }) => {
  if (!text || !text.trim()) {
    return <p className="text-sm text-gray-500">Not specified.</p>;
  }
  const lines = text.split("\n").filter((line) => line.trim());
  return (
    <ul className="space-y-1.5 pl-5 list-disc">
      {lines.map((line, index) => (
        <li key={index} className="text-sm text-gray-600 leading-relaxed">{line.trim()}</li>
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
    <div
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      <Icon className="w-3.5 h-3.5 mr-1" />
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-bold text-red-600 mb-3">
            Policy Data Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowBack className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center relative mb-6">
           <button
                onClick={() => navigate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center p-2 bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
                <ArrowBack className="w-5 h-5" />
            </button>
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {hotelData?.hotelName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">Policies & House Rules</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
            {/* Section 1: Key Information */}
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Key Information</p>
                <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                        <AccessTime className="text-gray-400 mt-0.5 w-5 h-5"/>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">Timings</p>
                            <p className="text-sm text-gray-500">Check-in: {mainPolicy.checkInPolicy?.split('\n')[1]?.trim() || 'N/A'}</p>
                            <p className="text-sm text-gray-500">Check-out: {mainPolicy.checkOutPolicy?.split('\n')[1]?.trim() || 'N/A'}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="flex items-start space-x-3">
                        <Groups className="text-gray-400 mt-0.5 w-5 h-5"/>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">Guest Policies</p>
                            <div className="mt-2 space-y-2">
                            {[
                                { key: "localId", title: "Local ID", value: hotelData.localId },
                                { key: "unmarriedCouplesAllowed", title: "Unmarried Couples", value: mainPolicy.unmarriedCouplesAllowed },
                                { key: "petsAllowed", title: "Pets", value: mainPolicy.petsAllowed },
                                { key: "bachelorAllowed", title: "Bachelors", value: mainPolicy.bachelorAllowed },
                                { key: "smokingAllowed", title: "Smoking", value: mainPolicy.smokingAllowed },
                                { key: "alcoholAllowed", title: "Alcohol", value: mainPolicy.alcoholAllowed },
                                { key: "internationalGuestAllowed", title: "International Guests", value: mainPolicy.internationalGuestAllowed },
                            ].map((p) => (
                                <div key={p.key} className="flex justify-between items-center">
                                    <p className="font-medium text-sm text-gray-600">{p.title}</p>
                                    <StatusChip status={p.value} />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Property Rules */}
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Property Rules</p>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Hotel Rules</p>
                        <PolicyTextItem text={mainPolicy.hotelsPolicy} />
                    </div>
                    <hr/>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Cancellation Policy</p>
                        <PolicyTextItem text={mainPolicy.cancellationPolicy} />
                    </div>
                    <hr/>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Refund Policy</p>
                        <PolicyTextItem text={mainPolicy.refundPolicy} />
                    </div>
                </div>
            </div>

            {/* Section 3: Tariffs */}
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Tariffs</p>
                <div className="space-y-4">
                    {/* On Season */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Deck className="text-gray-500 w-5 h-5" />
                            <p className="text-sm font-semibold text-gray-700">On Season</p>
                        </div>
                        <div className="space-y-3">
                            {groupedTariffs.on.map((t, index) => (
                                <React.Fragment key={t.key}>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-600 mb-1.5">{t.title}</p>
                                        <PolicyTextItem text={t.policies} />
                                    </div>
                                    {index < groupedTariffs.on.length - 1 && <hr />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    
                    <hr/>

                    {/* Off Season */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <SevereCold className="text-gray-500 w-5 h-5" />
                            <p className="text-sm font-semibold text-gray-700">Off Season</p>
                        </div>
                        <div className="space-y-3">
                            {groupedTariffs.off.map((t, index) => (
                                <React.Fragment key={t.key}>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-600 mb-1.5">{t.title}</p>
                                        <PolicyTextItem text={t.policies} />
                                    </div>
                                    {index < groupedTariffs.off.length - 1 && <hr />}
                                </React.Fragment>
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


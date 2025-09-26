import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  AccessTime,
  Groups,
  InfoOutlined,
  ArrowForward,
  CreditCard,
  FavoriteBorder,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function  HotelPolicyCard  ({ hotelData }) {
  const navigate = useNavigate();

  const handleViewFullPolicies = () => {
    navigate("/policies", {
      state: { hotelData, policies: hotelData.policies },
    });
  };

  // Compact key item
  const KeyPolicyItem = ({ icon, label, value, status }) => (
    <div className="flex items-start space-x-2 rounded-lg bg-gray-50 p-2">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p
          className={`text-xs font-semibold ${
            status
              ? status === "success"
                ? "text-green-600"
                : "text-red-600"
              : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  // Rules list
  const RulesList = ({ title, icon, value, limit }) => {
    if (!value) return null;
    const items = value
      .split("•")
      .filter((item) => item.trim())
      .slice(0, limit || undefined);
    if (items.length === 0) return null;

    return (
      <div>
        <div className="flex items-center space-x-1.5">
          {icon}
          <h6 className="font-semibold text-sm text-gray-800">{title}</h6>
        </div>
        <ul className="mt-1 pl-4 list-disc space-y-1 text-xs text-gray-600">
          {items.map((item, idx) => (
            <li key={idx}>{item.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Deduplicate policies
  const uniquePolicies = useMemo(() => {
    if (!Array.isArray(hotelData?.policies)) return [];
    const seen = new Set();
    return hotelData.policies.filter((policy) => {
      const str = JSON.stringify(policy);
      if (seen.has(str)) return false;
      seen.add(str);
      return true;
    });
  }, [hotelData]);

  const policy = uniquePolicies[0];
  if (!policy) return null;

  const checkInTime = policy.checkInPolicy?.split("•")[1]?.trim() || "N/A";
  const checkOutTime = policy.checkOutPolicy?.split("•")[1]?.trim() || "N/A";

  return (
    <div className="w-full">
      {/* Heading */}
      <Typography
        variant="h6"
        component="h2"
        className="font-semibold text-gray-900 bg-amber-500 rounded-md px-3 py-1 inline-block shadow-sm"
      >
        Hotel Policies
      </Typography>

      {/* Compact Mobile, Grid Desktop */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Combined card for mobile */}
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <KeyPolicyItem
              icon={<AccessTime fontSize="small" className="text-gray-500" />}
              label="Check-in Time"
              value={checkInTime}
            />
            <KeyPolicyItem
              icon={<AccessTime fontSize="small" className="text-gray-500" />}
              label="Check-out Time"
              value={checkOutTime}
            />
            <KeyPolicyItem
              icon={<FavoriteBorder fontSize="small" className="text-gray-500" />}
              label="Couples Allowed"
              value={policy.unmarriedCouplesAllowed === "Allowed" ? "Yes" : "No"}
              status={
                policy.unmarriedCouplesAllowed === "Allowed"
                  ? "success"
                  : "error"
              }
            />
            <KeyPolicyItem
              icon={<CreditCard fontSize="small" className="text-gray-500" />}
              label="Local ID"
              value={
                hotelData?.localId === "Accepted" ? "Accepted" : "Not Accepted"
              }
              status={hotelData?.localId === "Accepted" ? "success" : "error"}
            />
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="space-y-3">
            <RulesList
              title="Hotel Rules"
              icon={<Groups fontSize="small" className="text-gray-500" />}
              value={policy.hotelsPolicy}
              limit={2}
            />
            <RulesList
              title="Cancellation Policy"
              icon={<InfoOutlined fontSize="small" className="text-gray-500" />}
              value={policy.cancellationPolicy}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-3 flex justify-center md:justify-end">
        <button
          onClick={handleViewFullPolicies}
          className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Full Policies
          <ArrowForward className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

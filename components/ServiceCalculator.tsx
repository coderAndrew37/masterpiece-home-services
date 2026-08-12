"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

const ServiceCalculator: React.FC = () => {
  const [serviceType, setServiceType] = useState("residential");
  const [windowCount, setWindowCount] = useState(10);
  const [addons, setAddons] = useState<string[]>([]);
  const { openBooking } = useBooking();

  const calculatePrice = () => {
    let basePrice = 0;

    if (serviceType === "residential") {
      basePrice = 100 + windowCount * 5;
    } else {
      basePrice = 200 + windowCount * 4;
    }

    if (addons.includes("gutter")) basePrice += 99;
    if (addons.includes("pressure")) basePrice += 149;
    if (addons.includes("hardwater")) basePrice += 75;

    return basePrice;
  };

  const toggleAddon = (addon: string) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter((a) => a !== addon));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const handleGetQuote = () => {
    const serviceLabel = `${serviceType === "residential" ? "Residential" : "Commercial"} Window Cleaning`;
    const addonLabels = [
      addons.includes("gutter") && "Gutter Cleaning",
      addons.includes("pressure") && "Pressure Washing",
      addons.includes("hardwater") && "Hard Water Stain Removal",
    ].filter(Boolean);

    const note = `Estimate: $${calculatePrice()} CAD · ${windowCount} windows${
      addonLabels.length ? ` + ${addonLabels.join(", ")}` : ""
    }`;

    openBooking(serviceLabel, note);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 bg-blue-50">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Estimate Your Service Cost
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Service Type
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setServiceType("residential")}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    serviceType === "residential"
                      ? "bg-blue-700 text-white"
                      : "bg-white text-blue-900 border border-gray-300"
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setServiceType("commercial")}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    serviceType === "commercial"
                      ? "bg-blue-700 text-white"
                      : "bg-white text-blue-900 border border-gray-300"
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Number of Windows: <span className="font-bold">{windowCount}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={windowCount}
                onChange={(e) => setWindowCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>1-10</span>
                <span>11-25</span>
                <span>26-50</span>
                <span>51+</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Add-On Services
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "gutter", name: "Gutter Cleaning", price: 99 },
                  { id: "pressure", name: "Pressure Washing", price: 149 },
                  { id: "hardwater", name: "Hard Water Stain Removal", price: 75 },
                ].map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      addons.includes(addon.id)
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{addon.name}</div>
                        <div className="text-blue-700 font-bold">+${addon.price}</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          addons.includes(addon.id)
                            ? "bg-blue-700 border-blue-700 text-white"
                            : "border-gray-400"
                        }`}
                      >
                        {addons.includes(addon.id) && "✓"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">Estimated Cost</div>
            <div className="text-5xl font-bold mb-1">
              ${calculatePrice()} <span className="text-2xl align-top">CAD</span>
            </div>
            <p className="text-blue-200 mb-8 mt-4">
              This is an estimate based on your selections. Contact us for an exact quote.
            </p>
            <motion.button
              type="button"
              onClick={handleGetQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded-lg"
            >
              Get Exact Quote
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCalculator;
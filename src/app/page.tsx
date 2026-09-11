"use client";

import { useState } from "react";
import { Info, ChevronDown, Fuel, CarFront, Wrench, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HYRYDER_PRICE = 2176000;
const HYRYDER_MILEAGE = 27.97;
const HYRYDER_MAINTENANCE = 8000; 
const FUEL_PRICE = 114.04; 
const YEARS = 5;

const formatIN = (value: string) => {
  const digits = value.replace(/[^0-9.]/g, "");
  if (!digits) return "";
  const parts = digits.split(".");
  const intPart = parseInt(parts[0], 10);
  if (isNaN(intPart)) return parts.length > 1 ? `0.${parts[1]}` : "";
  const formattedInt = new Intl.NumberFormat('en-IN').format(intPart);
  if (value.endsWith(".")) return `${formattedInt}.`;
  return parts.length > 1 ? `${formattedInt}.${parts[1]}` : formattedInt;
};

const getRawNumber = (formatted: string) => parseFloat(formatted.replace(/,/g, "")) || 0;

export default function Home() {
  const [competitorPrice, setCompetitorPrice] = useState<string>("");
  const [competitorMileage, setCompetitorMileage] = useState<string>("");
  const [dailyKm, setDailyKm] = useState<string>("");
  const [competitorMaintenance, setCompetitorMaintenance] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const cPrice = getRawNumber(competitorPrice);
  const cMileage = getRawNumber(competitorMileage) || 1;
  const dKm = getRawNumber(dailyKm);
  const cMaint = getRawNumber(competitorMaintenance);
  
  const totalDays = YEARS * 365;
  const totalKm = dKm * totalDays;

  const isComplete = cPrice > 0 && cMileage > 0 && dKm > 0 && cMaint > 0;

  const cFuelTotal = (totalKm / cMileage) * FUEL_PRICE;
  const cMaintTotal = cMaint * YEARS;
  const cTCO = cPrice + cFuelTotal + cMaintTotal;

  const hFuelTotal = (totalKm / HYRYDER_MILEAGE) * FUEL_PRICE;
  const hMaintTotal = HYRYDER_MAINTENANCE * YEARS;
  const hTCO = HYRYDER_PRICE + hFuelTotal + hMaintTotal;

  const savings = cTCO - hTCO;
  const hasSavings = savings > 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <main className="min-h-[100dvh] bg-[#F4F5F7] text-gray-900 font-sans selection:bg-red-200 flex flex-col justify-center items-center p-4 sm:p-6 overflow-hidden relative">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-100/40 blur-[100px] rounded-full pointer-events-none" />

      <motion.div layout className="w-full max-w-md relative z-10 space-y-6">
        
        <motion.div layout className="text-center pt-4 mb-4">
          <h1 className="text-[40px] leading-none font-bold text-gray-900 tracking-tight font-heading">
            Compare & Save
          </h1>
          <p className="text-gray-500 text-[13px] mt-2 font-medium uppercase tracking-wider">5-Year Cost of Ownership</p>
        </motion.div>

        {/* Main Integrated Card */}
        <motion.div layout className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          
          {/* Inputs Section */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50">
                  <IndianRupee size={15} strokeWidth={2.5} />
                </div>
                <label className="text-[13px] font-bold text-gray-700">Comparing Model On-Road</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-semibold text-lg">₹</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(formatIN(e.target.value))}
                  placeholder="18,00,000"
                  className="w-full pl-9 pr-4 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none text-xl font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100/50">
                    <Fuel size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-[13px] font-bold text-gray-700">Mileage</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    maxLength={5}
                    value={competitorMileage}
                    onChange={(e) => setCompetitorMileage(formatIN(e.target.value))}
                    placeholder="16.5"
                    className="w-full pl-4 pr-12 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none text-xl font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold text-xs">km/l</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shadow-sm border border-purple-100/50">
                    <CarFront size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-[13px] font-bold text-gray-700">Daily Run</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={dailyKm}
                    onChange={(e) => setDailyKm(formatIN(e.target.value))}
                    placeholder="50"
                    className="w-full pl-4 pr-10 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-50 focus:border-purple-200 transition-all outline-none text-xl font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold text-xs">km</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100/50">
                  <Wrench size={14} strokeWidth={2.5} />
                </div>
                <label className="text-[13px] font-bold text-gray-700">Annual Maintenance</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-semibold text-lg">₹</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  value={competitorMaintenance}
                  onChange={(e) => setCompetitorMaintenance(formatIN(e.target.value))}
                  placeholder="12,000"
                  className="w-full pl-9 pr-4 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-200 transition-all outline-none text-xl font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Results Integrated Extension */}
          <AnimatePresence>
            {isComplete && (
              <motion.div 
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-dashed border-gray-200">
                  <div className="text-center">
                    <h2 className={`font-bold mb-2 text-[11px] uppercase tracking-widest ${hasSavings ? 'text-[#1B5E20]' : 'text-red-900'}`}>
                      {hasSavings ? "You Save (5 Years)" : "Extra Cost"}
                    </h2>
                    <div className={`text-[52px] leading-none font-heading font-bold tracking-tighter ${hasSavings ? 'text-[#1B5E20]' : 'text-red-900'}`}>
                      {formatCurrency(Math.abs(savings))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                      <CarFront size={12} className={hasSavings ? 'text-green-500' : 'text-red-500'} />
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${hasSavings ? 'text-green-700' : 'text-red-700'}`}>
                        With Toyota Hyryder Hybrid
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-5">
                    <button
                      onClick={() => setShowReport(!showReport)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <span>{showReport ? "Close Cost Breakdown" : "View Cost Breakdown"}</span>
                      <motion.div animate={{ rotate: showReport ? 180 : 0 }}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {showReport && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">
                            <div className="w-1/3 text-left">Parameter</div>
                            <div className="w-1/3 text-right text-red-500">Hyryder Hybrid</div>
                            <div className="w-1/3 text-right">Current</div>
                          </div>

                          <div className="bg-[#F9FAFB] rounded-[24px] p-2 space-y-1">
                            <div className="flex justify-between items-center py-2.5 px-3">
                              <div className="w-1/3 text-[12px] text-gray-500 font-bold">On-Road</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(HYRYDER_PRICE)}</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(cPrice)}</div>
                            </div>

                            <div className="flex justify-between items-center py-2.5 px-3">
                              <div className="w-1/3 text-[12px] text-gray-500 font-bold">Fuel (5y)</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(hFuelTotal)}</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(cFuelTotal)}</div>
                            </div>

                            <div className="flex justify-between items-center py-2.5 px-3">
                              <div className="w-1/3 text-[12px] text-gray-500 font-bold">Maint. (5y)</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(hMaintTotal)}</div>
                              <div className="w-1/3 text-right text-[13px] font-bold">{formatCurrency(cMaintTotal)}</div>
                            </div>

                            <div className="flex justify-between items-center mt-1 py-4 px-4 bg-gray-900 text-white rounded-[20px] shadow-lg shadow-gray-900/5">
                              <div className="w-1/3 text-[13px] font-bold">Total TCO</div>
                              <div className="w-1/3 text-right text-[14px] font-black text-red-400">{formatCurrency(hTCO)}</div>
                              <div className="w-1/3 text-right text-[14px] font-black">{formatCurrency(cTCO)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 px-2 flex gap-3 text-[11px] font-medium leading-relaxed text-gray-400">
                          <Info size={14} className="shrink-0 mt-0.5" />
                          <p>
                            Assumes fuel price at ₹114.04/L. Hyryder Hybrid mileage is 27.97 km/l. Maintenance is mock data (₹8,000/yr). 
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </main>
  );
}

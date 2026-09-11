"use client";

import { useState } from "react";
import { Info, ChevronDown, Fuel, CarFront, Wrench, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HYRYDER_PRICE = 2176000;
const HYRYDER_MILEAGE = 27.97;
const HYRYDER_MAINTENANCE = 5300; // 26,500 total for 5 years
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

const RUN_OPTIONS = [
  { label: "< 500 km", value: "400" },
  { label: "1,000 km", value: "1000" },
  { label: "1,500 km", value: "1500" },
  { label: "2,000 km", value: "2000" },
  { label: "> 2,000 km", value: "2500" },
];

const triggerHaptic = () => {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(40);
  }
};

export default function Home() {
  const [competitorPrice, setCompetitorPrice] = useState<string>("");
  const [competitorMileage, setCompetitorMileage] = useState<string>("");
  const [monthlyKm, setMonthlyKm] = useState<string>("");
  const [competitorMaintenance, setCompetitorMaintenance] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const cPrice = getRawNumber(competitorPrice);
  const cMileage = getRawNumber(competitorMileage) || 1;
  const mKm = getRawNumber(monthlyKm);
  const cMaint = getRawNumber(competitorMaintenance);
  
  const totalMonths = YEARS * 12;
  const totalKm = mKm * totalMonths;

  const isComplete = cPrice > 0 && cMileage > 0 && mKm > 0 && cMaint > 0;

  const cFuelTotal = (totalKm / cMileage) * FUEL_PRICE;
  const cMaintTotal = cMaint * YEARS;
  const cTCO = cPrice + cFuelTotal + cMaintTotal;

  const hFuelTotal = (totalKm / HYRYDER_MILEAGE) * FUEL_PRICE;
  const hMaintTotal = HYRYDER_MAINTENANCE * YEARS;
  const hTCO = HYRYDER_PRICE + hFuelTotal + hMaintTotal;

  const cFuelYearly = cFuelTotal / YEARS;
  const cFuelMonthly = cFuelYearly / 12;
  const hFuelYearly = hFuelTotal / YEARS;
  const hFuelMonthly = hFuelYearly / 12;

  const cMaintYearly = cMaint;
  const hMaintYearly = HYRYDER_MAINTENANCE;

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
    <main className="min-h-[100dvh] bg-[#F4F5F7] text-gray-900 font-sans selection:bg-red-200 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        <div className="text-center pt-2 mb-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 bg-white/60 backdrop-blur-md rounded-full border border-gray-200/50 text-gray-700 shadow-sm">
            <CarFront size={12} className="text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">Vs Toyota Hyryder Hybrid</span>
          </div>
          <h1 className="text-[40px] leading-none font-bold text-gray-900 tracking-tight font-heading">
            Compare & Save
          </h1>
          <p className="text-gray-500 text-[13px] mt-2 font-black uppercase tracking-widest">5-Year Cost of Ownership</p>
        </div>

        {/* Main Integrated Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          
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
                  maxLength={9}
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(formatIN(e.target.value))}
                  placeholder="18,00,000"
                  className="w-full pl-9 pr-4 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all outline-none text-xl font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-[1.1fr_1.9fr] gap-4">
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
                    className="w-full pl-3 pr-11 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none text-[18px] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold text-[11px]">km/l</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shadow-sm border border-purple-100/50">
                    <CarFront size={14} strokeWidth={2.5} />
                  </div>
                  <label className="text-[13px] font-bold text-gray-700">Monthly Run</label>
                </div>
                <div className="relative">
                  <select
                    value={monthlyKm}
                    onChange={(e) => {
                      triggerHaptic();
                      setMonthlyKm(e.target.value);
                    }}
                    className={`w-full px-4 py-3.5 bg-[#F9FAFB] border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-50 focus:border-purple-200 transition-all outline-none text-[15px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] appearance-none cursor-pointer ${!monthlyKm ? 'text-gray-400 font-medium' : 'text-gray-900 font-bold'}`}
                  >
                    <option value="" disabled hidden>Select approx...</option>
                    {RUN_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <div className="pt-6 border-t border-dashed border-gray-200">
                    <div className="text-center">
                      <h2 className={`font-bold mb-2 text-[11px] uppercase tracking-widest ${hasSavings ? 'text-[#1B5E20]' : 'text-red-900'}`}>
                        {hasSavings ? "You Save (5 Years)" : "Extra Cost"}
                      </h2>
                      <div className={`text-[52px] leading-none font-heading font-bold tracking-tighter ${hasSavings ? 'text-[#1B5E20]' : 'text-red-900'}`}>
                        {formatCurrency(Math.abs(savings))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setShowReport(!showReport)}
                        className="group flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-b from-white to-gray-50 hover:to-gray-100 active:bg-gray-100 text-gray-800 text-[11px] font-black uppercase tracking-widest rounded-[14px] transition-all active:scale-[0.97] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      >
                        <span>{showReport ? "Close Breakdown" : "View Cost Breakdown"}</span>
                        <motion.div animate={{ rotate: showReport ? 180 : 0 }} className="text-gray-400 group-hover:text-gray-600 transition-colors">
                          <ChevronDown size={14} strokeWidth={2.5} />
                        </motion.div>
                      </button>
                    </div>

                    <AnimatePresence>
                      {showReport && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 pb-1">
                            <div className="border border-gray-200/60 rounded-[20px] overflow-hidden bg-white shadow-sm">
                              {/* Header */}
                              <div className="flex bg-gray-50/50 border-b border-gray-200/60">
                                <div className="w-1/3 py-3 px-3 text-[10px] font-black uppercase tracking-widest text-gray-900 border-r border-gray-200/60 flex items-center">Parameter</div>
                                <div className="w-1/3 py-3 px-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 border-r border-gray-200/60 text-right">Hyryder</div>
                            <div className="w-1/3 py-3 px-3 text-[10px] font-black uppercase tracking-widest text-gray-900 text-right">Current</div>
                          </div>

                          {/* On-Road */}
                          <div className="flex border-b border-gray-200/60 items-center">
                            <div className="w-1/3 py-3 px-3 text-[12px] text-gray-900 font-bold border-r border-gray-200/60">On-Road</div>
                            <div className="w-1/3 py-3 px-3 text-[12px] font-bold text-right border-r border-gray-200/60">{formatCurrency(HYRYDER_PRICE)}</div>
                            <div className="w-1/3 py-3 px-3 text-[12px] font-bold text-right">{formatCurrency(cPrice)}</div>
                          </div>

                          {/* Fuel Section Header */}
                          <div className="flex bg-blue-50/40 border-b border-gray-200/60">
                            <div className="w-full py-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-blue-600">Fuel</div>
                          </div>
                          
                          {/* Fuel Rows */}
                          <div className="flex border-b border-gray-100 items-center">
                            <div className="w-1/3 py-2.5 px-3 text-[11px] text-gray-600 font-bold border-r border-gray-200/60">Monthly</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700 border-r border-gray-200/60">{formatCurrency(hFuelMonthly)}</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700">{formatCurrency(cFuelMonthly)}</div>
                          </div>
                          <div className="flex border-b border-gray-100 items-center">
                            <div className="w-1/3 py-2.5 px-3 text-[11px] text-gray-600 font-bold border-r border-gray-200/60">Yearly</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700 border-r border-gray-200/60">{formatCurrency(hFuelYearly)}</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700">{formatCurrency(cFuelYearly)}</div>
                          </div>
                          <div className="flex border-b border-gray-200/60 items-center">
                            <div className="w-1/3 py-2.5 px-3 text-[11px] text-gray-800 font-bold border-r border-gray-200/60">5 Years</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-black text-right border-r border-gray-200/60">{formatCurrency(hFuelTotal)}</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-black text-right">{formatCurrency(cFuelTotal)}</div>
                          </div>

                          {/* Maintenance Section Header */}
                          <div className="flex bg-orange-50/40 border-b border-gray-200/60">
                            <div className="w-full py-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-orange-600">Maintenance</div>
                          </div>

                          {/* Maintenance Rows */}
                          <div className="flex border-b border-gray-100 items-center">
                            <div className="w-1/3 py-2.5 px-3 text-[11px] text-gray-600 font-bold border-r border-gray-200/60">Yearly</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700 border-r border-gray-200/60">{formatCurrency(hMaintYearly)}</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-bold text-right text-gray-700">{formatCurrency(cMaintYearly)}</div>
                          </div>
                          <div className="flex border-b border-gray-200/60 items-center">
                            <div className="w-1/3 py-2.5 px-3 text-[11px] text-gray-800 font-bold border-r border-gray-200/60">5 Years</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-black text-right border-r border-gray-200/60">{formatCurrency(hMaintTotal)}</div>
                            <div className="w-1/3 py-2.5 px-3 text-[12px] font-black text-right">{formatCurrency(cMaintTotal)}</div>
                          </div>

                          {/* Total TCO */}
                          <div className="flex bg-gray-50/50 items-center">
                            <div className="w-1/3 py-3.5 px-3 text-[12px] text-gray-900 font-black border-r border-gray-200/60">Total TCO</div>
                            <div className="w-1/3 py-3.5 px-3 text-[13px] font-black text-right text-emerald-600 border-r border-gray-200/60">{formatCurrency(hTCO)}</div>
                            <div className="w-1/3 py-3.5 px-3 text-[13px] font-black text-right text-gray-900">{formatCurrency(cTCO)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 px-2 flex gap-3 text-[11px] font-medium leading-relaxed text-gray-400">
                          <Info size={14} className="shrink-0 mt-0.5" />
                          <p>
                            Assumes fuel price at ₹114.04/L. Hyryder Hybrid mileage is 27.97 km/l. Total maintenance is ₹26,500 for 5 years.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}

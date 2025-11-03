import React, { useState, useEffect } from "react";
import axios from "axios";
import Base from "../components/Base";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyImpact = () => {
  const [energySource, setEnergySource] = useState("grid");
  const [emissionFactors, setEmissionFactors] = useState({});
  const [appliances, setAppliances] = useState([]);
  const [search, setSearch] = useState("");
  const [carbonLimit] = useState(6.8);
  const [energySavings, setEnergySavings] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initial appliances data
  const initialAppliances = [
    { 
      id: 1, 
      name: "Refrigerator", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 150, 
      category: "home",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
    { 
      id: 2, 
      name: "Washing Machine", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 500, 
      category: "home",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
    { 
      id: 3, 
      name: "Dryer", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 3000, 
      category: "home",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
    { 
      id: 4, 
      name: "Air Conditioner", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 1500, 
      category: "home",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
    { 
      id: 5, 
      name: "Industrial Motor", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 7500, 
      category: "industrial",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
    { 
      id: 6, 
      name: "HVAC System", 
      isActive: false, 
      duration: { h: 0, m: 0, s: 0 }, 
      power: 10000, 
      category: "industrial",
      totalEmissions: 0,
      totalEnergy: 0,
      sessions: []
    },
  ];

  // Fetch emission factors from backend
  useEffect(() => {
    const fetchEmissionFactors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/emissionfactors/getemission");
        const factors = response.data;
        
        // Transform factors array to object for easy access
        const factorsObj = {};
        factors.forEach(factor => {
          factorsObj[factor.activity] = factor.factor;
        });
        
        setEmissionFactors(factorsObj);
      } catch (error) {
        console.error("Error fetching emission factors:", error);
        // Fallback to default factors
        setEmissionFactors({
          grid: 0.28,
          solar: 0.035,
          wind: 0.015,
          hydro: 0.03,
          naturalGas: 0.20
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmissionFactors();
    setAppliances(initialAppliances);
  }, []);

  // Helper function to get emission factor by energy source
  const getEmissionFactor = (source) => {
    if (!emissionFactors || Object.keys(emissionFactors).length === 0) {
      // Return default factors if not loaded yet
      const defaultFactors = {
        grid: 0.28,
        solar: 0.035,
        wind: 0.015,
        hydro: 0.03,
        naturalGas: 0.20
      };
      return defaultFactors[source] || 0.28;
    }
    
    return emissionFactors[source] || emissionFactors.grid || 0.28;
  };

  // Fetch chart data from backend
  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/energy-chart");
      if (response.data.success) {
        setChartData(response.data.chartData);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Save session to backend
  const saveSessionToDB = async (sessionData) => {
    try {
      await axios.post("http://localhost:5000/api/energy-sessions", sessionData);
      // Refresh chart data after saving
      fetchChartData();
    } catch (error) {
      console.error("Error saving session to DB:", error);
    }
  };

  // ⏱️ Timer updates active appliances every second
  useEffect(() => {
    const timer = setInterval(() => {
      setAppliances((apps) =>
        apps.map((app) =>
          !app.isActive
            ? app
            : {
                ...app,
                duration: {
                  h: app.duration.h + (app.duration.m === 59 && app.duration.s === 59 ? 1 : 0),
                  m: app.duration.m + (app.duration.s === 59 ? 1 : 0),
                  s: (app.duration.s + 1) % 60,
                },
              }
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate current emissions
  const calculateCurrentEmissions = (app) => {
    const hours = app.duration.h + app.duration.m / 60 + app.duration.s / 3600;
    const kWh = (app.power * hours) / 1000;
    return kWh * getEmissionFactor(energySource);
  };

  const calculateCurrentEnergy = (app) => {
    const hours = app.duration.h + app.duration.m / 60 + app.duration.s / 3600;
    return (app.power * hours) / 1000;
  };

  const calculateTotalEmissions = (app) => {
    return app.totalEmissions + (app.isActive ? calculateCurrentEmissions(app) : 0);
  };

  const calculateTotalEnergy = (app) => {
    return app.totalEnergy + (app.isActive ? calculateCurrentEnergy(app) : 0);
  };

  // Calculate savings compared to grid
  const calculateSavings = () => {
    const gridEmissions = appliances.reduce(
      (sum, app) => {
        const hours = (app.totalEnergy * 1000 / app.power) + 
                     (app.isActive ? (app.duration.h + app.duration.m / 60 + app.duration.s / 3600) : 0);
        const totalKWh = (app.power * hours) / 1000;
        return sum + totalKWh * getEmissionFactor("grid");
      },
      0
    );
    const currentEmissions = totalEmissions;
    return Math.max(0, gridEmissions - currentEmissions);
  };

  const totalEmissions = appliances.reduce(
    (sum, app) => sum + calculateTotalEmissions(app),
    0
  );

  const totalEnergyUsed = appliances.reduce(
    (sum, app) => sum + calculateTotalEnergy(app),
    0
  );

  useEffect(() => {
    setEnergySavings(calculateSavings());
  }, [energySource, appliances, emissionFactors]);

  const toggleAppliance = async (id) => {
    setAppliances((apps) =>
      apps.map((app) => {
        if (app.id === id) {
          if (app.isActive) {
            // Turning OFF - save current session
            const currentEmissions = calculateCurrentEmissions(app);
            const currentEnergy = calculateCurrentEnergy(app);
            const sessionDuration = { ...app.duration };
            const sessionData = {
              applianceId: app.id,
              applianceName: app.name,
              duration: sessionDuration,
              emissions: currentEmissions,
              energy: currentEnergy,
              power: app.power,
              energySource: energySource,
              timestamp: new Date().toISOString()
            };

            // Save to backend
            saveSessionToDB(sessionData);

            return {
              ...app,
              isActive: false,
              totalEmissions: app.totalEmissions + currentEmissions,
              totalEnergy: app.totalEnergy + currentEnergy,
              sessions: [
                ...app.sessions,
                {
                  id: Date.now(),
                  date: new Date().toLocaleString(),
                  duration: sessionDuration,
                  emissions: currentEmissions,
                  energy: currentEnergy,
                  power: app.power
                }
              ],
              duration: { h: 0, m: 0, s: 0 }
            };
          } else {
            // Turning ON
            return {
              ...app,
              isActive: true,
              duration: { h: 0, m: 0, s: 0 }
            };
          }
        }
        return app;
      })
    );
  };

  const resetAllAppliances = () => {
    setAppliances(apps => 
      apps.map(app => ({
        ...app,
        isActive: false,
        duration: { h: 0, m: 0, s: 0 }
      }))
    );
  };

  const clearAllHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/energy-sessions");
      setAppliances(apps => 
        apps.map(app => ({
          ...app,
          totalEmissions: 0,
          totalEnergy: 0,
          sessions: []
        }))
      );
      setChartData([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const filteredApps = appliances.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );
  const activeApps = appliances.filter((app) => app.isActive);

  const getProgressColor = (percentage) => {
    if (percentage < 70) return "bg-green-500";
    if (percentage < 90) return "bg-yellow-500";
    return "bg-red-600";
  };

  const progressPercentage = Math.min((totalEmissions / carbonLimit) * 100, 100);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-green-600">
            Emissions: {payload[0].value.toFixed(2)} kg CO₂
          </p>
          <p className="text-blue-600">
            Energy: {payload[1]?.value?.toFixed(2) || 0} kWh
          </p>
        </div>
      );
    }
    return null;
  };

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="lg:hidden mb-6">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">View</h3>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg">{isMobileMenuOpen ? "▲" : "▼"}</span>
          </button>
        </div>
        
        <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
          isMobileMenuOpen ? 'grid-rows-2 opacity-100' : 'grid-rows-0 opacity-0 h-0'
        }`}>
          <button
            onClick={() => {
              setShowHistory(false);
              setIsMobileMenuOpen(false);
            }}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
              !showHistory
                ? "bg-green-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="text-base">⚡</span>
            <span className="font-medium">Active</span>
          </button>
          <button
            onClick={() => {
              setShowHistory(true);
              setIsMobileMenuOpen(false);
            }}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
              showHistory
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="text-base">📊</span>
            <span className="font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );

  const energySources = [
    { id: "grid", name: "Grid", icon: "🏢" },
    { id: "solar", name: "Solar", icon: "☀️" },
    { id: "wind", name: "Wind", icon: "🌬️" },
    { id: "hydro", name: "Hydro", icon: "💧" },
    { id: "naturalGas", name: "Natural Gas", icon: "🔥" },
  ];

  return (
    <Base>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            ⚡ Real-time Energy Impact
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Monitor your carbon footprint with persistent tracking
          </p>

          {loading && (
            <div className="text-center text-gray-600 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p>Loading emission factors...</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Carbon Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {totalEmissions.toFixed(2)} kg
                    </div>
                    <p className="text-sm text-gray-600">Total CO₂</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {totalEnergyUsed.toFixed(2)} kWh
                    </div>
                    <p className="text-sm text-gray-600">Total Energy</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      {energySavings.toFixed(2)} kg
                    </div>
                    <p className="text-sm text-gray-600">CO₂ Saved</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {activeApps.length}
                    </div>
                    <p className="text-sm text-gray-600">Active Now</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Daily Carbon Limit: {carbonLimit} kg CO₂</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-700 ${getProgressColor(progressPercentage)}`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Emission History Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Emission History
                </h3>
                <div className="h-80">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="emissions" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: '#10b981', strokeWidth: 2 }}
                          name="CO₂ Emissions (kg)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="energy" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                          name="Energy (kWh)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <p>No chart data available</p>
                        <p className="text-sm mt-2">Start using appliances to see your emission history</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Energy Source Selector */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Energy Source
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {energySources.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setEnergySource(source.id)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        energySource === source.id
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="text-lg mb-1">{source.icon}</div>
                      <div className="font-semibold text-sm">{source.name}</div>
                      <div className="text-xs text-gray-600">
                        {getEmissionFactor(source.id).toFixed(3)} kg/kWh
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation */}
              <MobileNavigation />

              {/* History/Active Content */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {showHistory ? "Usage History" : "Active Appliances"} 
                    {!showHistory && ` (${activeApps.length})`}
                  </h3>
                  <div className="hidden lg:flex gap-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        showHistory 
                          ? "bg-blue-500 text-white hover:bg-blue-600" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {showHistory ? "Show Active" : "Show History"}
                    </button>
                    {showHistory && (
                      <button
                        onClick={clearAllHistory}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {showHistory ? (
                  /* History View */
                  <div className="space-y-4">
                    {appliances.map((app) => (
                      app.sessions.length > 0 && (
                        <div key={app.id} className="border rounded-xl p-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <div className="font-semibold text-gray-800">{app.name}</div>
                              <div className="text-sm text-gray-600">
                                Total: {calculateTotalEmissions(app).toFixed(2)} kg CO₂ • {calculateTotalEnergy(app).toFixed(2)} kWh
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {app.sessions.slice().reverse().map((session) => (
                              <div key={session.id} className="flex justify-between text-sm p-2 bg-white rounded border">
                                <div>
                                  <div className="font-medium">{session.date}</div>
                                  <div className="text-gray-600">
                                    {session.duration.h}h {session.duration.m}m {session.duration.s}s
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-green-600">
                                    {session.emissions.toFixed(2)} kg CO₂
                                  </div>
                                  <div className="text-gray-600">
                                    {session.energy.toFixed(2)} kWh
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                    {appliances.every(app => app.sessions.length === 0) && (
                      <div className="text-center text-gray-500 py-8">
                        <div className="text-6xl mb-4">📊</div>
                        <p>No usage history yet</p>
                        <p className="text-sm mt-2">Use appliances to see their history here</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Active Appliances View */
                  <div>
                    {activeApps.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <div className="text-6xl mb-4">🔌</div>
                        <p>No active appliances</p>
                        <p className="text-sm mt-2">Toggle appliances to start tracking</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeApps.map((app) => (
                          <div
                            key={app.id}
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {app.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {app.power}W • {app.duration.h}h {app.duration.m}m {app.duration.s}s
                                </div>
                                <div className="text-xs text-gray-500">
                                  Lifetime: {calculateTotalEmissions(app).toFixed(2)} kg CO₂
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">
                                {calculateCurrentEmissions(app).toFixed(2)} kg CO₂
                              </div>
                              <div className="text-sm text-gray-600">
                                {calculateCurrentEnergy(app).toFixed(2)} kWh
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                <input
                  type="text"
                  placeholder="🔍 Search appliances..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <div className="space-y-6">
                  {["home", "industrial"].map((category) => (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-800 mb-3 capitalize">
                        {category} Appliances
                      </h4>
                      <div className="space-y-3">
                        {filteredApps
                          .filter((app) => app.category === category)
                          .map((app) => (
                            <div
                              key={app.id}
                              className={`border rounded-xl p-4 transition-all ${
                                app.isActive
                                  ? "bg-green-50 border-green-200 shadow-sm"
                                  : "hover:shadow-md"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    {app.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {app.power}W
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Total: {calculateTotalEmissions(app).toFixed(2)} kg CO₂
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleAppliance(app.id)}
                                  className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                    app.isActive ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 bg-white rounded-full transform transition-all duration-300 ${
                                      app.isActive
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                    }`}
                                  />
                                </button>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                  {app.duration.h}h {app.duration.m}m {app.duration.s}s
                                </span>
                                <span
                                  className={`font-semibold ${
                                    app.isActive
                                      ? "text-green-600"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {app.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                              {app.isActive && (
                                <div className="mt-3 text-center text-green-600 font-bold">
                                  {calculateCurrentEmissions(app).toFixed(2)} kg CO₂
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {activeApps.length > 0 && (
                  <button
                    onClick={resetAllAppliances}
                    className="w-full mt-6 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
                  >
                    Stop All Appliances
                  </button>
                )}
              </div>

              {/* Tips Card */}
              <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  💡 Energy Saving Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Switch to solar/wind for lower emissions</li>
                  <li>• Turn off appliances when not in use</li>
                  <li>• Use energy-efficient appliances</li>
                  <li>• Monitor your daily carbon limit</li>
                  <li>• Check usage history to identify patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default EnergyImpact;
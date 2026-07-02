import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, 
  Layers, 
  Thermometer, 
  ShieldAlert, 
  TrendingUp, 
  Check, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  FileText, 
  Award, 
  Info, 
  RefreshCw, 
  Sliders, 
  BookOpen, 
  Clock,
  Printer,
  ChevronRight,
  Sparkles,
  Search,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPONENT_SPECS, CALCULATOR_ITEMS, COMPARISON_ROWS } from './data';
import { ComponentSpec, CalculatorItem, ComparisonRow, SimulationLog } from './types';

export default function App() {
  // Navigation & Tabs state
  const [activeTab, setActiveTab] = useState<'cpu' | 'gpu' | 'ram' | 'thermal'>('cpu');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calculator state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    cpu: true,
    gpu: true,
    ram: true,
    motherboard: true,
    ssd: true,
    cooler: true,
    psu: true,
    case: true,
  });
  
  // Custom adjustments for local EGP pricing
  const [priceAdjustment, setPriceAdjustment] = useState<number>(0); // -10% to +10%
  const [marketLocation, setMarketLocation] = useState<'el_bustan' | 'mall_of_arabia' | 'custom'>('el_bustan');
  
  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [activeVMCount, setActiveVMCount] = useState(0);
  const [laptopTemp, setLaptopTemp] = useState(38);
  const [laptopPerf, setLaptopPerf] = useState(100);
  const [desktopTemp, setDesktopTemp] = useState(32);
  const [desktopPerf, setDesktopPerf] = useState(100);
  const [simLogs, setSimLogs] = useState<SimulationLog[]>([]);
  
  // Interactive Benchmark selector
  const [benchmarkType, setBenchmarkType] = useState<'virtualization' | 'hashrate' | 'compiling' | 'thermal'>('virtualization');
  
  // Proposal approval state
  const [isApproved, setIsApproved] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [showPrintView, setShowPrintView] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auto scroll console log ref
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Time indicator (2026 academic timeline context)
  const [currentTime, setCurrentTime] = useState('2026-07-02 12:59:15');

  useEffect(() => {
    // Keep simulation console scrolled
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simLogs]);

  // Handle local EGP calculations
  const locationMultiplier = useMemo(() => {
    switch (marketLocation) {
      case 'mall_of_arabia': return 1.05; // 5% retail markup
      case 'custom': return 1 + (priceAdjustment / 100);
      case 'el_bustan':
      default: return 1.00; // base wholesale estimate
    }
  }, [marketLocation, priceAdjustment]);

  const calculatorSummary = useMemo(() => {
    let subtotal = 0;
    CALCULATOR_ITEMS.forEach(item => {
      if (checkedItems[item.id]) {
        subtotal += item.estEgpPrice;
      }
    });

    const adjustedTotal = Math.round(subtotal * locationMultiplier);
    // Prebuilt markup in Egypt is heavily inflated (usually 25% - 35% higher for same specs due to assembly, branding and overheads)
    const prebuiltEquivalent = Math.round(subtotal * 1.30);
    const moneySaved = prebuiltEquivalent - adjustedTotal;

    return {
      subtotal,
      adjustedTotal,
      prebuiltEquivalent,
      moneySaved
    };
  }, [checkedItems, locationMultiplier]);

  // Simulation running loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimProgress(prev => {
          const next = prev + 1.5;
          if (next >= 100) {
            setIsSimulating(false);
            setSimLogs(logs => [
              ...logs,
              { timestamp: '06.50s', message: '✓ STRESS TEST COMPLETED. LAPTOP ENGAGED THERMAL SAFE-MODE AT 94°C.', type: 'critical' },
              { timestamp: '07.00s', message: '✓ DESKTOP OPERATIONAL STABILITY MAINTAINED AT 59°C. 100% THROUGHPUT.', type: 'success' }
            ]);
            return 100;
          }

          // Dynamic metric variations
          const percent = next / 100;
          
          // Laptop climbs to hot 94C and throttles
          const currentLapTemp = Math.round(38 + (percent * 56) + (Math.sin(next) * 1.5));
          setLaptopTemp(currentLapTemp);

          if (currentLapTemp > 80) {
            // Drop laptop performance down to 35%
            setLaptopPerf(Math.max(34, Math.round(100 - (percent - 0.4) * 110)));
          } else if (currentLapTemp > 65) {
            setLaptopPerf(Math.round(100 - (percent - 0.2) * 50));
          }

          // Desktop climbs mildly to 59C and stays perfectly stable
          const currentDskTemp = Math.round(32 + (percent * 27) + (Math.sin(next) * 0.8));
          setDesktopTemp(currentDskTemp);
          setDesktopPerf(100); // Desktop never throttles!

          // Dynamic logs and active VM count updates based on timeline
          const currentSeconds = (next * 0.07).toFixed(2);
          
          if (prev < 15 && next >= 15 && activeVMCount < 1) {
            setActiveVMCount(1);
            setSimLogs(logs => [...logs, { 
              timestamp: `${currentSeconds}s`, 
              message: 'Initializing Hypervisor Engine. Booting KALI LINUX (VM-01)... Allocating 4 Cores, 6GB RAM.', 
              type: 'info' 
            }]);
          } else if (prev < 35 && next >= 35 && activeVMCount < 2) {
            setActiveVMCount(2);
            setSimLogs(logs => [...logs, { 
              timestamp: `${currentSeconds}s`, 
              message: '✓ KALI LINUX ready. Booting WINDOWS SERVER 2026 DC (VM-02)... Allocating 2 Cores, 8GB RAM.', 
              type: 'info' 
            }]);
          } else if (prev < 55 && next >= 55 && activeVMCount < 3) {
            setActiveVMCount(3);
            setSimLogs(logs => [...logs, { 
              timestamp: `${currentSeconds}s`, 
              message: '✓ AD Domain online. Booting METASPLOITABLE TARGET (VM-03)... Core allocation: 1 Core, 2GB RAM.', 
              type: 'info' 
            }]);
          } else if (prev < 75 && next >= 75 && activeVMCount < 4) {
            setActiveVMCount(4);
            setSimLogs(logs => [
              ...logs, 
              { timestamp: `${currentSeconds}s`, message: '✓ Target node listening. Booting PFSENSE SECURE FIREWALL (VM-04)...', type: 'info' },
              { timestamp: `${currentSeconds}s`, message: '⚠ WARNING: LAPTOP TJMAX TEMP EXCEEDED (85°C). THERMAL THROTTLING ACTIVATED!', type: 'warning' }
            ]);
          } else if (prev < 90 && next >= 90 && activeVMCount < 5) {
            setActiveVMCount(5);
            setSimLogs(logs => [
              ...logs, 
              { timestamp: `${currentSeconds}s`, message: 'Executing cross-VM brute-force simulation over localized virtual switch.', type: 'info' },
              { timestamp: `${currentSeconds}s`, message: '☠ CRITICAL: LAPTOP CPU CLOCK CHOKED TO 2.2GHZ (THERMAL PROT). HEAVY PACKET LOSS DETECTED.', type: 'critical' },
              { timestamp: `${currentSeconds}s`, message: '✓ CYBERLAB DESKTOP AM5: 5.4GHz STABLE. LIQUID COOLED RAD AT 55°C. ZERO DROPPED PACKETS.', type: 'success' }
            ]);
          }

          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating, activeVMCount]);

  // Handle toggle simulation
  const handleToggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
      setSimProgress(0);
      setActiveVMCount(0);
      setLaptopTemp(38);
      setLaptopPerf(100);
      setDesktopTemp(32);
      setDesktopPerf(100);
      setSimLogs([]);
    } else {
      setIsSimulating(true);
      setSimProgress(0);
      setActiveVMCount(0);
      setLaptopTemp(38);
      setLaptopPerf(100);
      setDesktopTemp(32);
      setDesktopPerf(100);
      setSimLogs([
        { timestamp: '0.00s', message: '⚡ SPINNING UP SYSTEM VIRTUALIZATION ENGINE...', type: 'info' },
        { timestamp: '0.20s', message: '⚡ DETECTED HOST HARDWARE ENGINES.', type: 'info' },
        { timestamp: '0.40s', message: 'Laptop Limit (Ryzen 7 7435HS, RTX 3050 4GB VRAM, 16GB RAM Bottleneck) vs. Workstation Limit (Ryzen 7 7700X, RTX 5070 12GB VRAM, 32GB DDR5 Overhead).', type: 'info' }
      ]);
    }
  };

  const handleSelectPreset = (preset: 'core' | 'full' | 'clear') => {
    if (preset === 'core') {
      setCheckedItems({
        cpu: true,
        gpu: true,
        ram: true,
        motherboard: false,
        ssd: false,
        cooler: false,
        psu: false,
        case: false,
      });
      triggerToast("Applied: Core Upgrade Preset (CPU + GPU + RAM) selected!");
    } else if (preset === 'full') {
      setCheckedItems({
        cpu: true,
        gpu: true,
        ram: true,
        motherboard: true,
        ssd: true,
        cooler: true,
        psu: true,
        case: true,
      });
      triggerToast("Applied: Complete Industrial Workstation build selected!");
    } else {
      setCheckedItems({
        cpu: false,
        gpu: false,
        ram: false,
        motherboard: false,
        ssd: false,
        cooler: false,
        psu: false,
        case: false,
      });
    }
  };

  const handleToggleItem = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 4000);
  };

  const handleApproveProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      triggerToast("Please enter your name to authorize the proposal!");
      return;
    }
    setIsApproved(true);
    triggerToast(`✨ PROPOSAL OFFICIALLY AUTHORIZED BY ${signerName.toUpperCase()}! Preparing system procurement list. ✨`);
  };

  // Get active tab details
  const activeComponentDetails = useMemo(() => {
    return COMPONENT_SPECS.find(c => c.id === activeTab) as ComponentSpec;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-brand-dark text-on-surface font-sans selection:bg-brand-cyan selection:text-brand-dark custom-scrollbar overflow-x-hidden relative">
      
      {/* Background Tech Grids */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 circuit-pattern"></div>
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-cyan/5 to-transparent"></div>
      </div>

      {/* Header Container */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-brand-surface/80 backdrop-blur-xl border-b border-brand-cyan/10 shadow-[0_0_20px_rgba(0,242,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan shadow-[0_0_10px_rgba(0,242,255,0.1)]">
            <Layers className="h-6 w-6 pulse-glow text-brand-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-brand-cyan font-bold tracking-widest uppercase">CyberLab Command Center</span>
            <span className="font-sans text-lg font-extrabold text-white tracking-tight -mt-1">Workstation Proposal</span>
          </div>
        </div>

        <nav className="hidden lg:flex gap-8">
          <a href="#assessment" className="text-brand-cyan border-b-2 border-brand-cyan pb-1 font-mono text-xs uppercase tracking-wider transition-all">
            Assessment
          </a>
          <a href="#comparison" className="text-on-surface-variant hover:text-brand-cyan transition-colors font-mono text-xs uppercase tracking-wider">
            Comparison
          </a>
          <a href="#calculator" className="text-on-surface-variant hover:text-brand-cyan transition-colors font-mono text-xs uppercase tracking-wider">
            Calculator
          </a>
          <a href="#roadmap" className="text-on-surface-variant hover:text-brand-cyan transition-colors font-mono text-xs uppercase tracking-wider">
            Academic ROI
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-mono text-on-surface-variant tracking-wider uppercase">System Timeline Context</span>
            <span className="text-xs font-mono text-brand-teal font-semibold">{currentTime}</span>
          </div>
          <a 
            href="#calculator"
            className="bg-brand-cyan text-brand-dark px-5 py-2 font-mono text-xs font-bold hover:bg-brand-teal active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.25)]"
          >
            Invest Now
          </a>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 relative z-10 space-y-6 pb-24">
        
        {/* Banner: Urgent local pricing alert */}
        <div className="relative group overflow-hidden border border-brand-amber/30 bg-brand-amber/5 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_15px_rgba(255,184,0,0.05)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-amber"></div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-8 w-8 rounded-md bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber shrink-0">
              <AlertTriangle className="h-5 w-5 pulse-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-amber uppercase tracking-widest">Market Urgency Alert Bulletin</span>
                <span className="px-2 py-[2px] bg-brand-rose/20 text-brand-rose font-mono text-[10px] font-bold uppercase rounded-sm">Mid-2026 Critical Window</span>
              </div>
              <h2 className="text-white font-bold text-sm mt-1">Egyptian Component Stocks Depleting - Procurement Window Closing</h2>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed max-w-4xl">
                Wholesale custom parts pricing in <span className="text-white font-semibold">El-Bustan (Downtown Cairo)</span> and official distributors at <span className="text-white font-semibold">Mall of Arabia</span> currently beat inflated local prebuilt markup by <span className="text-brand-cyan font-bold">30%+</span>. However, global 2026 supply chain allocations are prioritizing corporate AI centers. Local currency fluctuations mean pricing is highly volatile. Parts must be secured immediately to avoid imminent Egyptian market price spikes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline font-mono text-[10px] text-brand-amber uppercase">Status: Action Required</span>
            <div className="h-2 w-2 rounded-full bg-brand-amber pulse-glow"></div>
          </div>
        </div>

        {/* Hero Segment */}
        <section className="bg-brand-surface-card border border-brand-cyan/10 p-6 sm:p-8 rounded-lg relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <div className="scanline"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-cyan pulse-glow"></span>
                <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">Academic hardware assessment</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Command Center: <span className="text-brand-cyan">2026 Strategic Acquisition</span>
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
                Evaluating the core technical infrastructure required for the rigorous <span className="text-white font-semibold">2026 Computer Science &amp; Cybersecurity Degree Curriculum</span>. This assessment demonstrates why transition from power-limited mobile assets to a dedicated, high-performance modular workstation is highly critical for virtual sandbox labs, cryptographic testing, and system longevity.
              </p>
            </div>

            <div className="flex flex-row sm:flex-col gap-4 lg:text-right border-t border-brand-cyan/10 lg:border-t-0 pt-4 lg:pt-0 shrink-0">
              <div className="flex-1 lg:flex-initial">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">PREPARED FOR:</span>
                <span className="text-lg font-bold text-white tracking-wide">Rabiea abou diaa (Dad)</span>
              </div>
              <div className="flex-1 lg:flex-initial">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">PREPARED BY:</span>
                <span className="text-lg font-bold text-brand-cyan tracking-wide flex items-center lg:justify-end gap-1.5">
                  CS Student <Award className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE COMPONENT TABS */}
        <section id="assessment" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-brand-cyan/15 pb-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="text-brand-cyan h-5 w-5" /> 
                Interactive Component Matrix
              </h2>
              <p className="text-xs text-on-surface-variant">Click each core component to explore why it accelerates cyber academic workloads</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['cpu', 'gpu', 'ram', 'thermal'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold transition-all border-b-2 ${
                    activeTab === tab 
                      ? 'text-brand-cyan border-brand-cyan bg-brand-cyan/5 shadow-[inset_0_-8px_16px_rgba(0,242,255,0.04)]' 
                      : 'text-brand-teal/60 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'cpu' && 'Processing Core (CPU)'}
                  {tab === 'gpu' && 'Cryptographic Core (GPU)'}
                  {tab === 'ram' && 'Virtual Memory (RAM)'}
                  {tab === 'thermal' && 'Platform & Cooling'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg relative overflow-hidden"
            >
              {/* Scanline decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                {activeTab === 'cpu' && <Cpu className="h-48 w-48 text-brand-cyan" />}
                {activeTab === 'gpu' && <ShieldAlert className="h-48 w-48 text-brand-cyan" />}
                {activeTab === 'ram' && <Layers className="h-48 w-48 text-brand-cyan" />}
                {activeTab === 'thermal' && <Thermometer className="h-48 w-48 text-brand-cyan" />}
              </div>

              {/* Main specifications left column */}
              <div className="lg:col-span-7 space-y-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan rounded">
                      ID: COMP_00{activeTab === 'cpu' ? '1' : activeTab === 'gpu' ? '2' : activeTab === 'ram' ? '3' : '4'}
                    </span>
                    <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">{activeComponentDetails.metricLabel}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">{activeComponentDetails.title}</h3>
                  <p className="text-sm text-brand-cyan font-semibold">{activeComponentDetails.name}</p>
                </div>

                <div className="p-4 bg-brand-dark/60 border border-brand-cyan/5 rounded-md">
                  <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest block mb-1.5">Primary Academic Purpose</span>
                  <p className="text-sm text-on-surface leading-relaxed">{activeComponentDetails.academicRole}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-brand-rose/5 border border-brand-rose/20 rounded-md">
                    <span className="font-mono text-[10px] text-brand-rose font-bold uppercase tracking-widest flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 shrink-0" /> Laptop Ceiling Bottleneck
                    </span>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{activeComponentDetails.limitation}</p>
                  </div>
                  <div className="p-4 bg-brand-emerald/5 border border-brand-emerald/20 rounded-md">
                    <span className="font-mono text-[10px] text-brand-emerald font-bold uppercase tracking-widest flex items-center gap-1">
                      <Check className="h-3 w-3 shrink-0" /> Workstation Resolution
                    </span>
                    <p className="text-xs text-on-surface mt-2 leading-relaxed">{activeComponentDetails.advantage}</p>
                  </div>
                </div>

                <div className="p-4 bg-brand-cyan/5 border-l-4 border-brand-cyan rounded-r-md">
                  <span className="font-mono text-[10px] text-brand-cyan font-bold uppercase tracking-widest block mb-1">Real-World Cybersecurity Lab Impact</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{activeComponentDetails.impact}</p>
                </div>
              </div>

              {/* Hardware specifications breakdown right column */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-brand-dark/40 border border-brand-cyan/10 p-5 rounded-md relative z-10">
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-brand-cyan/10 pb-2 mb-4 flex items-center justify-between">
                    <span>Technical Spec Sheet</span>
                    <span className="text-[10px] text-brand-cyan font-mono">{activeComponentDetails.loadMetric}</span>
                  </h4>
                  <div className="space-y-4">
                    {activeComponentDetails.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                        <span className="text-xs font-mono text-on-surface-variant">{spec.label}</span>
                        <span className="text-xs font-mono text-brand-cyan font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-cyan/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-on-surface-variant uppercase">Current Status in Assessment:</span>
                    <span className="px-2 py-0.5 bg-brand-cyan/15 text-brand-cyan text-[10px] font-bold uppercase border border-brand-cyan/30 rounded-full pulse-glow">
                      Highly Critical
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-normal">
                    This component has been prioritized as an indispensable requirement for the second and third-year coursework including CS-4200: Advanced Network Penetration Labs.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* VIRTUALIZATION STRESS TEST SIMULATION SECTION */}
        <section className="bg-brand-surface-card border border-brand-cyan/15 p-6 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
            <TrendingUp className="h-64 w-64 text-brand-cyan" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-cyan/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan pulse-glow"></span>
                  Visual Hardware Simulator: Multi-VM Sandboxed Lab Run
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Compare the live thermal degradation and performance output of the laptop vs. proposed workstation running concurrent VM workloads.
                </p>
              </div>
              <button
                onClick={handleToggleSimulation}
                className={`px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,242,255,0.1)] hover:scale-95 active:scale-90 ${
                  isSimulating 
                    ? 'bg-brand-rose text-white border border-brand-rose' 
                    : 'bg-brand-cyan text-brand-dark hover:bg-brand-teal'
                }`}
              >
                {isSimulating ? 'STOP SIMULATION' : 'START VM STRESS SIMULATOR'}
              </button>
            </div>

            {/* Simulated Nodes Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Laptop Node */}
              <div className={`lg:col-span-4 p-5 border bg-brand-dark/40 rounded-lg flex flex-col justify-between transition-all duration-300 ${
                laptopTemp > 80 ? 'border-brand-rose/40 throttling-active' : 'border-white/10'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-mono text-xs text-on-surface uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-rose inline-block"></span>
                      Mobile Laptop Asset
                    </span>
                    <span className="px-2 py-0.5 bg-brand-rose/10 border border-brand-rose/25 text-brand-rose font-mono text-[9px] font-bold uppercase rounded">
                      Ryzen 7 7435HS / RTX 3050 (4GB) / 16GB RAM
                    </span>
                  </div>

                  {/* Temperature Thermals */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant uppercase">Core Thermal Load</span>
                      <span className={`font-bold ${laptopTemp > 80 ? 'text-brand-rose' : 'text-on-surface'}`}>
                        {laptopTemp}°C
                      </span>
                    </div>
                    <div className="h-2 w-full bg-brand-dark rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          laptopTemp > 80 ? 'bg-brand-rose' : laptopTemp > 65 ? 'bg-brand-amber' : 'bg-brand-cyan'
                        }`}
                        style={{ width: `${Math.min(100, (laptopTemp / 95) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Performance Throughput */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant uppercase">CPU Clock Throughput</span>
                      <span className={`font-bold ${laptopPerf < 50 ? 'text-brand-rose' : 'text-brand-cyan'}`}>
                        {laptopPerf}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-brand-dark rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          laptopPerf < 50 ? 'bg-brand-rose' : 'bg-brand-cyan'
                        }`}
                        style={{ width: `${laptopPerf}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-center min-h-[40px] flex items-center justify-center">
                  {laptopTemp > 80 ? (
                    <span className="text-[10px] font-mono text-brand-rose font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center pulse-glow">
                      <AlertTriangle className="h-4 w-4" /> CPU Throttling Active - Overheating
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                      Idle / Light Load Standby
                    </span>
                  )}
                </div>
              </div>

              {/* Console Logs center block */}
              <div className="lg:col-span-4 p-5 bg-black/90 border border-brand-cyan/15 rounded-lg flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-center border-b border-brand-cyan/10 pb-2 mb-3">
                    <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Virtual Hypervisor Monitor
                    </span>
                    <span className="font-mono text-[9px] text-on-surface-variant">{activeVMCount} VMs Online</span>
                  </div>
                  
                  <div className="space-y-2 h-[150px] overflow-y-auto custom-scrollbar text-[10px] font-mono text-on-surface-variant">
                    {simLogs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <Info className="h-5 w-5 text-brand-cyan/40 mb-1" />
                        <p className="text-[9px]">Click the simulator button to spin up cybersecurity guest systems.</p>
                      </div>
                    ) : (
                      simLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-brand-cyan/60 shrink-0">[{log.timestamp}]</span>
                          <span className={
                            log.type === 'warning' ? 'text-brand-amber' :
                            log.type === 'critical' ? 'text-brand-rose font-semibold' :
                            log.type === 'success' ? 'text-brand-emerald font-semibold' : 'text-on-surface-variant'
                          }>
                            {log.message}
                          </span>
                        </div>
                      ))
                    )}
                    <div ref={consoleEndRef}></div>
                  </div>
                </div>

                <div className="border-t border-brand-cyan/10 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">Active Load Phase:</span>
                  <span className="font-mono text-[10px] text-brand-cyan">
                    {isSimulating ? `Stress Testing... ${Math.round(simProgress)}%` : 'System Ready'}
                  </span>
                </div>
              </div>

              {/* Workstation Node */}
              <div className="lg:col-span-4 p-5 border border-brand-cyan/20 bg-brand-cyan/5 rounded-lg flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-brand-cyan/10 pb-2">
                    <span className="font-mono text-xs text-brand-cyan uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan inline-block pulse-glow"></span>
                      Proposed Desktop Workstation
                    </span>
                    <span className="px-2 py-0.5 bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan font-mono text-[9px] font-bold uppercase rounded">
                      Ryzen 7 / 32GB DDR5
                    </span>
                  </div>

                  {/* Temperature Thermals */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant uppercase">Core Thermal Load</span>
                      <span className="font-bold text-brand-cyan">
                        {desktopTemp}°C
                      </span>
                    </div>
                    <div className="h-2 w-full bg-brand-dark rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300 rounded-full bg-brand-cyan"
                        style={{ width: `${Math.min(100, (desktopTemp / 95) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Performance Throughput */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant uppercase">CPU Clock Throughput</span>
                      <span className="font-bold text-brand-emerald">
                        {desktopPerf}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-brand-dark rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-brand-emerald"
                        style={{ width: `${desktopPerf}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-cyan/10 text-center min-h-[40px] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-brand-emerald font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
                    <Check className="h-4 w-4" /> Dual-Fan Liquid cooling stable
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: THE PERFORMANCE MATRIX (Side-by-Side Comparison Table) */}
        <section id="comparison" className="bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-brand-cyan h-5 w-5" />
              Side-by-Side Architectural Assessment
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Analyzing critical engineering variances between a standard laptop client and the proposed 2026 custom hardware.
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-brand-cyan/20 text-on-surface-variant">
                  <th className="py-3 px-4 font-bold uppercase tracking-widest text-[11px] text-brand-cyan">Hardware Vector</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-widest text-[11px] text-brand-rose">Current Laptop Specs</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-widest text-[11px] text-brand-emerald">Proposed Workstation Specs</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-widest text-[11px] text-brand-cyan">Real-World Academic Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface text-xs">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr key={index} className="hover:bg-brand-cyan/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white tracking-tight text-[12px]">{row.category}</td>
                    <td className="py-4 px-4 text-brand-rose/90 bg-brand-rose/[0.01]">{row.laptopSpec}</td>
                    <td className="py-4 px-4 text-brand-emerald font-semibold bg-brand-emerald/[0.01]">{row.desktopSpec}</td>
                    <td className="py-4 px-4 text-on-surface-variant font-sans leading-relaxed text-[12px]">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Benchmarks Visualizer Card */}
          <div className="p-5 bg-brand-dark/40 border border-brand-cyan/10 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div>
                <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest block">Interactive Visual benchmarks</span>
                <h4 className="text-sm font-bold text-white">Estimated Computational Power Multiplier</h4>
              </div>
              <div className="flex flex-wrap gap-1 bg-brand-dark border border-white/10 p-1 rounded-md">
                {(['virtualization', 'hashrate', 'compiling', 'thermal'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setBenchmarkType(b)}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold transition-all rounded ${
                      benchmarkType === b 
                        ? 'bg-brand-cyan text-brand-dark' 
                        : 'text-brand-teal/60 hover:text-white'
                    }`}
                  >
                    {b === 'virtualization' && 'VM Overhead'}
                    {b === 'hashrate' && 'Hash Cracking'}
                    {b === 'compiling' && 'Code Compiles'}
                    {b === 'thermal' && 'Acoustic / Temps'}
                  </button>
                ))}
              </div>
            </div>

            {/* Benchmark Render Chart bars */}
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-brand-rose">Current Mobile Laptop Performance</span>
                  <span className="font-bold text-brand-rose">
                    {benchmarkType === 'virtualization' && '1-2 VMs (Baseline)'}
                    {benchmarkType === 'hashrate' && '1.2M hashes/sec'}
                    {benchmarkType === 'compiling' && '2.8 min compiling'}
                    {benchmarkType === 'thermal' && '95°C Peak / 58dB Noise'}
                  </span>
                </div>
                <div className="h-4 w-full bg-brand-dark rounded-sm overflow-hidden border border-brand-rose/20">
                  <div 
                    className="h-full bg-brand-rose transition-all duration-500 rounded-r-sm"
                    style={{ 
                      width: 
                        benchmarkType === 'virtualization' ? '25%' :
                        benchmarkType === 'hashrate' ? '18%' :
                        benchmarkType === 'compiling' ? '35%' : '98%'
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-brand-emerald">Proposed Custom Workstation Performance</span>
                  <span className="font-bold text-brand-emerald flex items-center gap-1">
                    {benchmarkType === 'virtualization' && '5+ VMs simultaneous (4.2x capacity) 🚀'}
                    {benchmarkType === 'hashrate' && '6.8M hashes/sec (5.6x speedup) 🚀'}
                    {benchmarkType === 'compiling' && '45 seconds (3.7x faster) 🚀'}
                    {benchmarkType === 'thermal' && '62°C Peak / 28dB Silent 🚀'}
                  </span>
                </div>
                <div className="h-4 w-full bg-brand-dark rounded-sm overflow-hidden border border-brand-emerald/20">
                  <div 
                    className="h-full bg-brand-emerald transition-all duration-500 rounded-r-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    style={{ 
                      width: 
                        benchmarkType === 'virtualization' ? '100%' :
                        benchmarkType === 'hashrate' ? '100%' :
                        benchmarkType === 'compiling' ? '100%' : '38%'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-brand-cyan/[0.02] p-3 border border-brand-cyan/10 rounded text-[11px] text-on-surface-variant flex items-start gap-2">
              <Info className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {benchmarkType === 'virtualization' && 'With 32GB of DDR5 RAM and a desktop CPU, we bypass page-swapping altogether. High speed cache facilitates VM coordination.'}
                {benchmarkType === 'hashrate' && 'The desktop NVIDIA RTX 5070 utilizes next-gen Blackwell parallel pipelines. Laptop mobile GPUs suffer from power starvation (70W laptop cap vs. 220W desktop clearance).'}
                {benchmarkType === 'compiling' && 'Compiling large C++ codebases and scanning files for vulnerability hooks uses intensive clock cycles. The Ryzen 7700X maintains 5.4 GHz continuous boost.'}
                {benchmarkType === 'thermal' && 'Laptops restrict fan speed to avoid user discomfort. This causes heavy clock speed throttling within minutes. Liquid cooling disperses heat over an expansive radiator structure.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: LIVE INTERACTIVE PRICE & PART CALCULATOR */}
        <section id="calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Calculator Interactive list (left col) */}
          <div className="lg:col-span-8 bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-cyan/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-brand-cyan h-5 w-5" />
                  Live Procurement Cost Calculator
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Adjust custom configurations, select modular presets, and inspect estimated local prices in Egyptian Pounds (EGP).
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectPreset('core')}
                  className="px-3 py-1.5 bg-brand-cyan/10 border border-brand-cyan/30 hover:bg-brand-cyan/20 text-brand-cyan rounded text-[10px] font-mono uppercase transition-all"
                >
                  Core Only
                </button>
                <button
                  onClick={() => handleSelectPreset('full')}
                  className="px-3 py-1.5 bg-brand-cyan/10 border border-brand-cyan/30 hover:bg-brand-cyan/20 text-brand-cyan rounded text-[10px] font-mono uppercase transition-all"
                >
                  Full Build
                </button>
                <button
                  onClick={() => handleSelectPreset('clear')}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface rounded text-[10px] font-mono uppercase transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Marketplace Source Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-brand-dark/40 border border-white/5 rounded">
              <button
                onClick={() => setMarketLocation('el_bustan')}
                className={`p-2 font-mono text-[11px] font-bold uppercase rounded flex items-center justify-center gap-2 transition-all ${
                  marketLocation === 'el_bustan' 
                    ? 'bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan' 
                    : 'bg-transparent border border-transparent text-brand-teal/60 hover:text-white'
                }`}
              >
                <span>El-Bustan Wholesalers</span>
                <span className="text-[9px] px-1 bg-brand-cyan/20 text-brand-cyan rounded">EGP ±0%</span>
              </button>
              
              <button
                onClick={() => setMarketLocation('mall_of_arabia')}
                className={`p-2 font-mono text-[11px] font-bold uppercase rounded flex items-center justify-center gap-2 transition-all ${
                  marketLocation === 'mall_of_arabia' 
                    ? 'bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan' 
                    : 'bg-transparent border border-transparent text-brand-teal/60 hover:text-white'
                }`}
              >
                <span>Mall of Arabia Retail</span>
                <span className="text-[9px] px-1 bg-brand-amber/20 text-brand-amber rounded">Markup +5%</span>
              </button>

              <button
                onClick={() => setMarketLocation('custom')}
                className={`p-2 font-mono text-[11px] font-bold uppercase rounded flex items-center justify-center gap-2 transition-all ${
                  marketLocation === 'custom' 
                    ? 'bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan' 
                    : 'bg-transparent border border-transparent text-brand-teal/60 hover:text-white'
                }`}
              >
                <span>Custom Adjuster</span>
                <span className="text-[9px] px-1 bg-white/10 text-white rounded">Manual slider</span>
              </button>
            </div>

            {/* Slider shown only for custom location */}
            {marketLocation === 'custom' && (
              <div className="p-4 bg-brand-cyan/[0.02] border border-brand-cyan/10 rounded space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant">Manual Egyptian Market Price Variance:</span>
                  <span className={`font-bold ${priceAdjustment >= 0 ? 'text-brand-amber' : 'text-brand-emerald'}`}>
                    {priceAdjustment >= 0 ? `+${priceAdjustment}%` : `${priceAdjustment}%`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-10" 
                  max="10" 
                  value={priceAdjustment} 
                  onChange={(e) => setPriceAdjustment(Number(e.target.value))}
                  className="w-full accent-brand-cyan bg-brand-dark h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[9px] text-on-surface-variant block leading-relaxed">
                  Allows simulating local hardware discounts or currency-hedge offsets over the baseline list values.
                </span>
              </div>
            )}

            {/* Components Item List */}
            <div className="space-y-3 max-h-[440px] overflow-y-auto custom-scrollbar pr-1">
              {CALCULATOR_ITEMS.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleToggleItem(item.id)}
                  className={`p-4 border transition-all rounded-lg cursor-pointer flex items-start gap-4 ${
                    checkedItems[item.id]
                      ? 'border-brand-cyan/30 bg-brand-cyan/[0.02]'
                      : 'border-white/5 bg-brand-dark/20 hover:border-white/10'
                  }`}
                >
                  <div className="mt-1 shrink-0">
                    {checkedItems[item.id] ? (
                      <CheckSquare className="h-5 w-5 text-brand-cyan" />
                    ) : (
                      <Square className="h-5 w-5 text-on-surface-variant" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-bold text-white tracking-tight">{item.name}</span>
                      <span className="text-sm font-bold text-brand-cyan font-mono whitespace-nowrap">
                        {Math.round(item.estEgpPrice * locationMultiplier).toLocaleString()} EGP
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">{item.description}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-on-surface-variant uppercase rounded-full">
                        {item.category}
                      </span>
                      {item.isCore && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-brand-cyan/15 border border-brand-cyan/20 text-brand-cyan font-bold uppercase rounded-full pulse-glow">
                          Primary Asset
                        </span>
                      )}
                      <span className="text-[9px] font-mono text-on-surface-variant/50">
                        ({item.notes})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Investment summary panel (right col) */}
          <div className="lg:col-span-4 bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-brand-cyan/10 pb-2 flex items-center justify-between">
                <span>Investment Breakdown</span>
                <span className="text-[10px] text-brand-cyan font-mono">Egypt Market EGP</span>
              </h4>

              {/* Cost blocks */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">Baseline Component Cost</span>
                  <span className="font-mono text-sm font-semibold">{calculatorSummary.subtotal.toLocaleString()} EGP</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
                    Market Factor Markup
                    <Info className="h-3.5 w-3.5 text-on-surface-variant" title="Based on selected retailer presets" />
                  </span>
                  <span className="font-mono text-sm font-semibold text-brand-amber">
                    {marketLocation === 'el_bustan' && 'Wholesale Base (0%)'}
                    {marketLocation === 'mall_of_arabia' && 'Retail Surcharge (+5%)'}
                    {marketLocation === 'custom' && `${priceAdjustment >= 0 ? '+' : ''}${priceAdjustment}% Variance`}
                  </span>
                </div>

                <div className="border-t border-brand-cyan/15 pt-4 flex flex-col space-y-1">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Estimated Procurement Total</span>
                  <span className="font-mono text-3xl font-extrabold text-brand-cyan tracking-tight">
                    {calculatorSummary.adjustedTotal.toLocaleString()} <span className="text-sm font-bold text-white">EGP</span>
                  </span>
                </div>

                {/* Prebuilt comparison alert block */}
                <div className="p-4 bg-brand-emerald/5 border border-brand-emerald/20 rounded-md space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">Equiv. Egyptian Prebuilt Price:</span>
                    <span className="font-bold text-white">{calculatorSummary.prebuiltEquivalent.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-emerald font-bold uppercase">Estimated Dad-Budget Savings:</span>
                    <span className="font-bold text-brand-emerald">-{calculatorSummary.moneySaved.toLocaleString()} EGP</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed border-t border-brand-emerald/10 pt-2">
                    ✓ Custom building bypasses Egyptian system assembler tax, saving <strong className="text-white">{(30).toFixed(0)}%</strong> while allowing high-quality, long-life parts.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-brand-cyan/15">
              <p className="text-[11px] text-on-surface-variant leading-normal">
                All estimates are generated utilizing local 2026 hardware data and include basic supplier clearance margins.
              </p>
              
              <button 
                onClick={() => {
                  window.print();
                  triggerToast("Report print view triggered. Use print settings to save as PDF.");
                }}
                className="w-full py-3 bg-brand-cyan/10 border border-brand-cyan/40 hover:bg-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded"
              >
                <Printer className="h-4 w-4" /> Export Print Report / Invoice
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: ACADEMIC TIMELINE / CONVINCER GRID */}
        <section id="roadmap" className="bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-cyan/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="text-brand-cyan h-5 w-5" />
                Academic Return-on-Investment (ROI) Roadmap
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                How this hardware asset will be systematically leveraged across 4 years of CS and Cybersecurity studies.
              </p>
            </div>
            <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 border border-brand-cyan/25 rounded-full">
              Longevity Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Year 1 */}
            <div className="p-4 bg-brand-dark/40 border border-white/5 rounded-lg flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-brand-cyan">
                  <span>CURRICULUM YEAR 01</span>
                  <span className="px-1.5 py-0.5 bg-brand-cyan/15 rounded text-[9px] font-bold">READY</span>
                </div>
                <h4 className="text-sm font-bold text-white">Fundamentals &amp; Basic VM Sandbox</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Introduction to Linux OS architecture, virtual host configs, and high-level programming tools. Single VM sandboxing.
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-brand-cyan/80">
                🚀 Workload: Host + 1 guest node.
              </div>
            </div>

            {/* Year 2 */}
            <div className="p-4 bg-brand-dark/40 border border-white/5 rounded-lg flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-brand-amber">
                  <span>CURRICULUM YEAR 02</span>
                  <span className="px-1.5 py-0.5 bg-brand-amber/15 rounded text-[9px] font-bold text-brand-amber">CRITICAL</span>
                </div>
                <h4 className="text-sm font-bold text-white">Cryptography &amp; Malware Lab</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Intensive labs decrypting passwords with Hashcat (NVIDIA Blackwell optimized CUDA core usage) and running controlled malware.
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-brand-amber/80">
                🚀 Workload: Cryptographic acceleration.
              </div>
            </div>

            {/* Year 3 */}
            <div className="p-4 bg-brand-dark/40 border border-white/5 rounded-lg flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-brand-teal">
                  <span>CURRICULUM YEAR 03</span>
                  <span className="px-1.5 py-0.5 bg-brand-teal/15 rounded text-[9px] font-bold text-brand-teal">ADVANCED</span>
                </div>
                <h4 className="text-sm font-bold text-white">Active Directory &amp; Penetration</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Simulating Enterprise targets. Requires running Kali Linux, Windows AD Domain, Windows Client, and target routers concurrently.
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-brand-teal/80">
                🚀 Workload: 4-5 VMs fluid sandboxing.
              </div>
            </div>

            {/* Year 4 */}
            <div className="p-4 bg-brand-dark/40 border border-white/5 rounded-lg flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-brand-emerald">
                  <span>CURRICULUM YEAR 04</span>
                  <span className="px-1.5 py-0.5 bg-brand-emerald/15 rounded text-[9px] font-bold text-brand-emerald">CAPSTONE</span>
                </div>
                <h4 className="text-sm font-bold text-white">Graduation Project &amp; Local AI</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Advanced capstone research in localized AI-powered defensive threat hunting and large language threat parsing models.
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-brand-emerald/80">
                🚀 Workload: Next-gen ML workflows.
              </div>
            </div>

          </div>

          <div className="p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-md text-xs text-on-surface-variant flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Award className="h-4 w-4 text-brand-cyan" /> Industrial Lifespan Strategy: Built to Last
              </h4>
              <p className="max-w-4xl leading-relaxed">
                Purchasing a laptop restricts hardware lifetime to ~2.5 years before thermal degradation forces replacement. The <strong className="text-white">AM5 modular desktop platform</strong> ensures we can swap separate pieces over <strong className="text-brand-cyan">7+ years</strong> without replacing the system, saving extensive capital over time.
              </p>
            </div>
            <div className="shrink-0 font-mono font-bold text-brand-cyan text-sm">
              SAVES 35,000+ EGP LONG-TERM
            </div>
          </div>
        </section>

        {/* PROPOSAL AUTHORIZATION MODULE (The dad-approver) */}
        <section className="bg-brand-surface border border-brand-cyan/15 p-6 rounded-lg text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-amber to-brand-emerald"></div>
          
          <AnimatePresence mode="wait">
            {!isApproved ? (
              <motion.div 
                key="sign-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto space-y-6"
              >
                <div className="space-y-2">
                  <div className="h-12 w-12 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Authorize Academic Hardware Proposal</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Dad, by signing this proposal you officially approve this strategic computing transition to assist in advanced cybersecurity virtualization and course compliance.
                  </p>
                </div>

                <form onSubmit={handleApproveProposal} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                    <input 
                      type="text" 
                      placeholder="Enter Dad's Name (e.g. Rabiea abou diaa)"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      className="bg-black border border-brand-cyan/20 rounded px-4 py-2.5 text-xs text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-brand-cyan transition-all text-center flex-1 font-mono"
                    />
                    <button 
                      type="submit"
                      className="bg-brand-cyan text-brand-dark font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 hover:bg-brand-teal transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Authorize Proposal</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-mono block">
                    Secured by CyberLab digital credentialing system.
                  </span>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="approved-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto space-y-6 py-4"
              >
                <div className="h-16 w-16 bg-brand-emerald/10 border-2 border-brand-emerald text-brand-emerald rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <Check className="h-10 w-10 pulse-glow text-brand-emerald" />
                </div>
                
                <div className="space-y-2">
                  <span className="px-3 py-1 bg-brand-emerald/15 border border-brand-emerald/20 text-brand-emerald text-[10px] font-mono font-bold uppercase rounded-full">
                    Proposal Officially Approved
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">PROPOSAL SIGNED &amp; COMPLIANT</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Thank you, Dad (<strong className="text-white">{signerName}</strong>)! Your strategic authorization has unlocked the educational hardware resource plan. Secure procurement list generated.
                  </p>
                </div>

                <div className="p-4 bg-brand-emerald/5 border border-brand-emerald/20 rounded max-w-sm mx-auto font-mono text-[11px] text-brand-emerald flex flex-col gap-1 text-center">
                  <div>DIGITAL SIGNATURE SECURED</div>
                  <div className="text-[9px] opacity-60">ID: SEC_PROPOSAL_REQ_APPROVED</div>
                  <div className="text-[9px] opacity-60">TIMESTAMP: 2026-07-02 12:59:15 UTC</div>
                </div>

                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => {
                      window.print();
                    }}
                    className="px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/30 hover:bg-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold uppercase rounded"
                  >
                    Download Invoice PDF
                  </button>
                  <button 
                    onClick={() => {
                      setIsApproved(false);
                      setSignerName('');
                    }}
                    className="px-5 py-2 bg-white/5 hover:bg-white/10 text-on-surface-variant font-mono text-xs font-bold uppercase rounded"
                  >
                    Reset Authorization
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* Footer Container */}
      <footer className="w-full bg-brand-surface-card border-t border-brand-cyan/10 py-6 px-6 text-center text-xs text-on-surface-variant relative z-10 space-y-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[11px]">
            © 2026 CyberLab Academic Hardware Assessment Group. All rights reserved.
          </span>
          <div className="flex gap-6 font-mono text-[11px]">
            <a href="#assessment" className="hover:text-brand-cyan transition-colors">Academic Protocols</a>
            <a href="#comparison" className="hover:text-brand-cyan transition-colors">Lab Specifications</a>
            <a href="#calculator" className="hover:text-brand-cyan transition-colors">Procurement Matrix</a>
          </div>
        </div>
      </footer>

      {/* Interactive Floating Toast notification */}
      <AnimatePresence>
        {isToastOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-brand-surface-card border border-brand-cyan/30 text-white rounded-lg shadow-2xl flex items-center gap-3 font-sans text-xs max-w-sm"
          >
            <div className="h-8 w-8 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
              <Sparkles className="h-4 w-4 pulse-glow" />
            </div>
            <div>
              <p className="font-semibold text-white">System Advisory</p>
              <p className="text-on-surface-variant mt-0.5">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

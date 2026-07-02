import { ComponentSpec, CalculatorItem, ComparisonRow } from './types';

export const COMPONENT_SPECS: ComponentSpec[] = [
  {
    id: 'cpu',
    name: 'AMD Ryzen 7 7700X',
    type: 'cpu',
    title: 'Processing Core: Ryzen 7 7700X',
    iconName: 'Cpu',
    loadMetric: 'LOAD: 12%',
    metricLabel: 'CURRENT FREQUENCY: 5.4 GHz',
    academicRole: 'High-performance processing engine designed to distribute dedicated hardware threads across multiple hyper-visors.',
    limitation: 'Ryzen 7 7435HS mobile processor (restricted to 35-45W power) triggers thermal throttling, downclocking speed to 2.2 GHz under intense multi-VM virtualization workloads.',
    advantage: '8 full desktop cores with massive L3 Cache (40MB total) running natively at 5.4 GHz under constant continuous operation.',
    impact: 'Enables fluid operation of 4-5 concurrent heavy Virtual Machines (e.g., Kali Linux, Windows Domain Controller, PfSense Router, Metasploitable) without host lag.',
    specs: [
      { label: 'Cores / Threads', value: '8 Cores / 16 Threads' },
      { label: 'Base / Boost Clock', value: '4.5 GHz / 5.4 GHz' },
      { label: 'Cache Capacity', value: '40 MB Total L2+L3' },
      { label: 'TDP / Architecture', value: '105W / Zen 4 (AM5)' },
    ]
  },
  {
    id: 'gpu',
    name: 'NVIDIA RTX 5070 (12GB)',
    type: 'gpu',
    title: 'Neural Graphics & Cryptographic Accelerator: RTX 5070',
    iconName: 'Cpu',
    loadMetric: 'TEMP: 34°C',
    metricLabel: 'VRAM: 12GB GDDR7',
    academicRole: 'Parallel CUDA-computing unit for cryptographic decryption, brute-force password security testing, and local AI threat modeling.',
    limitation: 'NVIDIA GeForce RTX 3050 Laptop GPU with only 4GB VRAM and restricted power limit causes severe memory starvation and processing bottlenecks during parallel cryptographic decryption and penetration labs.',
    advantage: 'Next-generation Blackwell architecture, ultra-fast 12GB GDDR7 memory bus, full 220W desktop performance clearance.',
    impact: 'Reduces password cracking (Hashcat) decryption workloads from several hours to minutes, enabling practical in-class cryptography lab assessments.',
    specs: [
      { label: 'Architecture', value: 'Blackwell (Next-Gen)' },
      { label: 'VRAM Size / Type', value: '12 GB GDDR7' },
      { label: 'Memory Bus Bandwidth', value: '192-bit / ~504 GB/s' },
      { label: 'CUDA Cores', value: '6,400+ Units' },
    ]
  },
  {
    id: 'ram',
    name: '32GB DDR5 6000MHz',
    type: 'ram',
    title: 'Dynamic Memory Matrix: 32GB Dual-Channel DDR5',
    iconName: 'Layers',
    loadMetric: 'UTIL: 2.1GB',
    metricLabel: 'BANDWIDTH: 48,000 MB/s',
    academicRole: 'Provides physical allocation space for memory-intensive guest operating systems to execute without swapping to disk.',
    limitation: '16GB is standard for laptops, leaving only ~12GB free. Running the host + just one Active Directory Server consumes 100% of memory.',
    advantage: '32GB DDR5 high-speed dual-channel headroom allows dedicating 4-6GB RAM to each running VM while maintaining perfect host fluidity.',
    impact: 'Eliminates memory paging bottlenecks, preventing VM freeze-ups and system-wide Blue Screens during multi-stage local cyber attacks.',
    specs: [
      { label: 'Memory Size', value: '32 GB (2x16GB)' },
      { label: 'Type / Speed', value: 'DDR5 / 6000 MT/s' },
      { label: 'Latency Timing', value: 'CL30 (Ultra-Low)' },
      { label: 'Expansion Limits', value: 'Up to 128 GB on B650' },
    ]
  },
  {
    id: 'thermal',
    name: 'Liquid AIO / AM5 Platform',
    type: 'thermal',
    title: 'Thermal Resilience & Long-Term Lifespan Strategy',
    iconName: 'Thermometer',
    loadMetric: 'STABLE: 62°C',
    metricLabel: 'PLATFORM: AM5 Socket',
    academicRole: 'High-volume desktop cooling and a modular socket design to ensure steady sustained computing performance over a 7+ year lifespan.',
    limitation: 'Laptops run constantly hot (85-95°C), leading to accelerated solder-joint degradation and component failure in 2-3 years with zero upgrade paths.',
    advantage: '240mm Liquid Cooling maintains temps under 65°C under 100% load. Modular AM5 platform supports drop-in CPU upgrades until 2028+.',
    impact: 'Ensures the system will easily last through entire undergraduate and graduate university careers, saving money by avoiding replacement laptops.',
    specs: [
      { label: 'Cooling Block', value: '240mm Dual-Fan Liquid AIO' },
      { label: 'Peak Temp Under Load', value: '62°C (vs 95°C Laptop)' },
      { label: 'Socket Standard', value: 'AMD AM5 (Long-term)' },
      { label: 'System Modular Lifespan', value: '7+ Years (Replaceable parts)' },
    ]
  }
];

export const CALCULATOR_ITEMS: CalculatorItem[] = [
  {
    id: 'cpu',
    name: 'AMD Ryzen 7 7700X Processor',
    category: 'Core Compute',
    estEgpPrice: 14200,
    description: '8 Cores / 16 Threads, 5.4 GHz Boost. Crucial parallel engine for 4-5 Virtual Machines.',
    isCore: true,
    notes: 'El-Bustan Mall, Cairo'
  },
  {
    id: 'gpu',
    name: 'NVIDIA RTX 5070 (12GB GDDR7)',
    category: 'Security Acceleration',
    estEgpPrice: 32500,
    description: 'Blackwell GPU. Highly critical for cryptography, password hash decryption (Hashcat), and AI modeling.',
    isCore: true,
    notes: 'Official Distributor pricing'
  },
  {
    id: 'ram',
    name: '32GB DDR5 6000MHz RAM Kit',
    category: 'Virtualization Matrix',
    estEgpPrice: 7800,
    description: 'CL30 high-speed dual channel memory. Prevents system crash & RAM bottleneck during network simulations.',
    isCore: true,
    notes: 'High-speed low latency standard'
  },
  {
    id: 'motherboard',
    name: 'MSI PRO B650M-A Wi-Fi AM5',
    category: 'Chassis Infrastructure',
    estEgpPrice: 10500,
    description: 'AM5 motherboard supporting PCIe 5.0, high-speed DDR5, and wireless networking for sandbox environments.',
    isCore: false,
    notes: 'Supports drop-in upgrades up to 2028+'
  },
  {
    id: 'ssd',
    name: '2TB NVMe Gen4/Gen5 High-Speed SSD',
    category: 'Fast Storage',
    estEgpPrice: 7200,
    description: 'Provides ultra-fast read/write speeds for booting multiple virtual systems and loading multi-gigabyte datasets.',
    isCore: false,
    notes: 'Instant VM snapshot rollbacks'
  },
  {
    id: 'cooler',
    name: 'DeepCool LE520 240mm Liquid Cooler',
    category: 'Thermal Regulation',
    estEgpPrice: 4800,
    description: 'Maintains Ryzen 7 temperatures below 65°C under continuous multi-hour simulation stress tests.',
    isCore: false,
    notes: 'Guarantees zero thermal throttling'
  },
  {
    id: 'psu',
    name: 'XPG Pylon 750W 80+ Bronze/Gold Modular',
    category: 'Chassis Infrastructure',
    estEgpPrice: 5200,
    description: 'Ensures reliable, highly efficient power delivery to support the advanced RTX 5070 and desktop components.',
    isCore: false,
    notes: 'Premium safety protections'
  },
  {
    id: 'case',
    name: 'Antec NX292 Airflow Mid-Tower Case',
    category: 'Chassis Infrastructure',
    estEgpPrice: 3500,
    description: 'Excellent mesh front design with multiple pre-installed cooling fans for maximum thermal dissipation.',
    isCore: false,
    notes: 'High structural durability'
  }
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: 'Core Processor',
    laptopSpec: 'AMD Ryzen 7 7435HS Mobile (Base 3.10 GHz, thermal limits, restricted cooling)',
    desktopSpec: 'Ryzen 7 7700X (105W continuous power, massive 40MB total cache)',
    impact: 'Desktops maintain 5.4 GHz under 100% thread load. Laptops downclock to 2.2 GHz to avoid melting.',
    iconName: 'Cpu'
  },
  {
    category: 'VRAM & Cryptography',
    laptopSpec: 'RTX 3050 Laptop GPU (Restricted to 4GB VRAM, narrow 128-bit bus)',
    desktopSpec: 'RTX 5070 Desktop (12GB GDDR7, Blackwell parallel processing cores)',
    impact: 'RTX 5070 cracks cryptographic hash chains 4.2x faster, vital for cybersecurity labs.',
    iconName: 'ShieldAlert'
  },
  {
    category: 'Virtualization Limit',
    laptopSpec: '1-2 VMs simultaneously. Hosting more causes severe memory paging & OS crash.',
    desktopSpec: '4-5 VMs fluidly. Sandbox network running AD Domain, Router, Kali, and Target node.',
    impact: 'Essential for simulating multi-node exploit scenarios requested in 2026 course.',
    iconName: 'Layers'
  },
  {
    category: 'Thermal Management',
    laptopSpec: 'Heavily thermal throttled. Fan noise at 55dB, temperatures constantly pegging at 95°C.',
    desktopSpec: 'Liquid AIO system keeps core temperatures at an ultra-cool 62°C under full lab load.',
    impact: 'Extended hardware lifespan (7+ years) vs Laptop component burnout in 2-3 years.',
    iconName: 'Thermometer'
  },
  {
    category: 'Upgrade Modularity',
    laptopSpec: 'Zero upgrade options. CPU, GPU, and RAM are completely soldered to the motherboard.',
    desktopSpec: 'Full AM5 modular socket. Motherboard, memory, and cooling can be reused for 8+ years.',
    impact: 'Saves major expenses. Future upgrades only require a simple part swap, not a brand-new computer.',
    iconName: 'CheckCircle'
  }
];

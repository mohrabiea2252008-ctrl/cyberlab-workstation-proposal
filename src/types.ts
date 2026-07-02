export interface ComponentSpec {
  id: string;
  name: string;
  type: 'cpu' | 'gpu' | 'ram' | 'thermal';
  title: string;
  iconName: string;
  loadMetric: string;
  metricLabel: string;
  academicRole: string;
  limitation: string;
  advantage: string;
  impact: string;
  specs: { label: string; value: string }[];
}

export interface CalculatorItem {
  id: string;
  name: string;
  category: string;
  estEgpPrice: number;
  description: string;
  isCore: boolean;
  notes?: string;
}

export interface ComparisonRow {
  category: string;
  laptopSpec: string;
  desktopSpec: string;
  impact: string;
  iconName: string;
}

export interface SimulationLog {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'critical';
}

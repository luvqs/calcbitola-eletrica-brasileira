
export interface UsageType {
  id: string;
  label: string;
  icon: JSX.Element;
  defaultPower: number;
  suggestions: number[];
}

export interface InstallationType {
  id: string;
  label: string;
  description: string;
}

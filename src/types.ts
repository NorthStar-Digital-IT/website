export interface CriticalIssue {
  title: string;
  severity: "High" | "Medium" | "Info";
  description: string;
  howToFix: string;
}

export interface AuditResult {
  seoScore: number;
  performanceScore: number;
  designScore: number;
  summary: string;
  criticalIssues: CriticalIssue[];
  recommendations: string[];
  localSeoBrief: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  features?: string[];
}

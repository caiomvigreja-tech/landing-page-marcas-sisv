
export interface LeadData {
  name: string;
  brandName: string;
  businessType: string;
  whatsapp: string;
}

export interface BrandAnalysisResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  summary: string;
  advice: string;
}

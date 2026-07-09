export interface DocumentFile {
  name: string;
  type: string;
  size: number;
  url: string;
  preview?: string;
}

export const KYC_STEPS = [
  { id: 1, title: "Upload ID" },
  { id: 2, title: "Live Verification" },
  { id: 3, title: "Review & Submit" },
];
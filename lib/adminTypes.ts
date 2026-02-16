export type PreRegistrationStatus = "pending" | "confirmed";

export type PilotOperationalStatus = "active" | "pending_payment" | "inactive";

export type PilotCategory = "Junior" | "Senior" | "Master";

export type AdminPanelView =
  | "dashboard"
  | "pending"
  | "confirmed"
  | "pilots"
  | "stats"
  | "export"
  | "settings";

export type PreRegistrationRecord = {
  id: string;
  fullName: string;
  phone: string;
  identityNumber: string;
  eventAge: number;
  email: string;
  insuranceAccepted: boolean;
  imageAccepted: boolean;
  liabilityAccepted: boolean;
  legalDocumentationStatus: "complete" | "incomplete";
  createdAt: string;
  confirmedAt: string | null;
  confirmedBy: string | null;
  internalNotes: string | null;
  pilotStatus: PilotOperationalStatus;
  pilotCategory: PilotCategory | null;
  competitiveNotes: string | null;
  status: PreRegistrationStatus;
};

export type InternalCommentRecord = {
  id: string;
  pilotId: string;
  content: string;
  createdAt: string;
};

export type DashboardStats = {
  total: number;
  confirmed: number;
  pending: number;
  occupancyPercent: number;
};

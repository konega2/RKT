export type PreRegistrationStatus = "pending" | "confirmed";

export type PreRegistrationRecord = {
  id: string;
  fullName: string;
  phone: string;
  identityNumber: string;
  eventAge: number;
  email: string;
  createdAt: string;
  status: PreRegistrationStatus;
};

export type DashboardStats = {
  total: number;
  confirmed: number;
  pending: number;
  occupancyPercent: number;
};

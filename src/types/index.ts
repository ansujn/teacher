// Shared type helpers derived from the Prisma models.

export type ShowStatus = "draft" | "published" | "archived";

export type NavItem = {
  href: string;
  label: string;
};

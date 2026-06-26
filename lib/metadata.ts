import type { Metadata } from "next";

export const SITE_NAME = "Eautokauf";

export function createPageMetadata(
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
  };
}

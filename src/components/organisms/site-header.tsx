"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import type { NavItem, NavCTA } from "@/types"

interface SiteHeaderProps {
  navItems: NavItem[]
  cta: NavCTA
}

export function SiteHeader({ navItems, cta }: SiteHeaderProps) {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null
  return <Header navItems={navItems} cta={cta} />
}

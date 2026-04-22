"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Link2,
  HelpCircle,
  BarChart3,
  LogOut,
  ExternalLink,
  Users,
  ShieldCheck,
} from "lucide-react"
import { logoutAction } from "../login/actions"

interface AdminShellProps {
  user: { email: string; name: string; role: "master" | "editor" }
  children: React.ReactNode
}

const NAV = [
  {
    section: "Operação",
    master: false,
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    section: "Conteúdo",
    master: false,
    items: [
      { label: "CTAs", href: "/admin/ctas", icon: Link2 },
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
      { label: "Cliques", href: "/admin/cliques", icon: BarChart3 },
    ],
  },
  {
    section: "Master",
    master: true,
    items: [
      { label: "Usuários", href: "/admin/usuarios", icon: Users },
      { label: "Auditoria", href: "/admin/audit", icon: ShieldCheck },
    ],
  },
] as const

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname()

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-neutral-50">
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-extrabold text-charcoal tracking-tight">HSR</span>
            <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
              Painel Staff
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.filter((s) => !s.master || user.role === "master").map((section) => (
            <div key={section.section} className="mb-4">
              <div className="px-6 py-2 text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/40">
                {section.section}
              </div>
              <ul>
                {section.items.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href)
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={[
                          "flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors relative",
                          active
                            ? "text-marrom bg-marrom/5 border-l-2 border-marrom"
                            : "text-charcoal/70 hover:text-charcoal hover:bg-neutral-50 border-l-2 border-transparent",
                        ].join(" ")}
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100 flex flex-col gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-charcoal/60 hover:text-charcoal transition-colors"
          >
            <ExternalLink size={12} />
            Ver site público
          </Link>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-charcoal truncate">
              {user.name || user.email}
            </span>
            <span className="text-[10px] uppercase tracking-kicker text-charcoal/50">
              {user.role === "master" ? "Master" : "Editor"}
            </span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-xs font-medium text-charcoal/70 hover:text-error transition-colors"
            >
              <LogOut size={12} />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto p-8 lg:p-10">{children}</div>
      </main>
    </div>
  )
}

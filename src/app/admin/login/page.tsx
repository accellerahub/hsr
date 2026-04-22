import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/atoms/logo"
import { LoginForm } from "./login-form"

export const metadata = {
  title: "Acesso Staff | Hospital São Rafael",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-charcoal via-[#1a1410] to-charcoal flex items-center justify-center p-6">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar pro site
      </Link>

      <div className="w-full max-w-[460px] flex flex-col items-center gap-8">
        <Logo variant="light" height={56} />

        <div className="w-full bg-white rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marrom/10 text-marrom text-xs font-extrabold uppercase tracking-kicker">
              <span className="w-1.5 h-1.5 rounded-full bg-marrom animate-pulse" />
              Área Restrita
            </span>
            <h2 className="text-2xl font-extrabold text-charcoal">Acesso Staff</h2>
            <p className="text-sm text-charcoal/60 text-center">
              Login exclusivo da equipe Hospital São Rafael.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useTransition } from "react"
import { Eye, EyeOff } from "lucide-react"
import { loginAction } from "./actions"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [showPw, setShowPw] = useState(false)
  const [pending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await loginAction(formData)
      if (res?.error) setError(res.error)
    })
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-5 w-full"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-extrabold uppercase tracking-kicker text-charcoal/60"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="voce@hospitalsaorafael.com"
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 text-charcoal bg-white placeholder:text-charcoal/30 focus:outline-none focus:border-marrom transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-xs font-extrabold uppercase tracking-kicker text-charcoal/60"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            required
            className="w-full px-4 py-3 pr-12 rounded-lg border border-neutral-200 text-charcoal bg-white focus:outline-none focus:border-marrom transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal/70 transition-colors"
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-error/10 border border-error/30 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-lg bg-marrom text-white font-bold uppercase tracking-wide hover:bg-ouro-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-xs text-charcoal/50">
        Problemas pra entrar?{" "}
        <a
          href="mailto:grupoaccellera@gmail.com"
          className="text-marrom font-semibold hover:underline"
        >
          Fale com o administrador
        </a>
      </p>
    </form>
  )
}

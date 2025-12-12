import type { PropsWithChildren } from 'react'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell text-white">
      <div className="mx-auto min-h-screen w-full max-w-[1500px] px-6 py-8">
        <div className="glass-panel border-white/5 bg-midnight/60">{children}</div>
      </div>
    </div>
  )
}

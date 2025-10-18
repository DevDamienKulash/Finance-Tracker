import { ReactNode } from "react";

export function AppShell({
  sidebar,
  header,
  children
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-full w-full grid place-items-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex">
          <aside className="hidden md:block w-64 bg-cream/60 border-r">{sidebar}</aside>
          <main className="flex-1">
            {header}
            <div className="p-6 md:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

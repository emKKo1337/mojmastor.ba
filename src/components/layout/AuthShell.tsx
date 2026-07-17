import Image from "next/image";
import { Logo } from "@/components/layout/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-background p-margin-mobile">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-xl bg-surface-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-surface-container-low p-16 lg:flex">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/illustrations/login-bg.jpg"
              alt=""
              fill
              className="mix-blend-overlay grayscale object-cover"
              priority={false}
            />
          </div>
          <div className="relative z-10">
            <Logo className="mb-12" />
            <h1 className="mb-6 max-w-md text-display-lg leading-tight text-text-main">
              Pronađite pravog <span className="text-primary">majstora</span> za vaš dom.
            </h1>
            <p className="max-w-md text-body-lg text-text-muted">
              Pridružite se hiljadama zadovoljnih korisnika koji su pronašli pouzdane stručnjake u svom komšiluku.
            </p>
          </div>

          <div className="relative z-10 mt-auto max-w-sm rounded-lg border border-white/40 bg-white/80 p-6 shadow-sm backdrop-blur-md">
            <div className="mb-2 flex items-center gap-1 text-tertiary" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <MaterialIcon key={i} name="star" filled />
              ))}
            </div>
            <p className="mb-4 text-body-md italic text-text-main">
              &ldquo;Nikad brže nisam pronašao vodoinstalatera. Majstor je bio tu za 30 minuta!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed font-bold text-primary">
                A
              </div>
              <div>
                <p className="text-label-lg">Amar H.</p>
                <p className="text-label-sm text-text-muted">Sarajevo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-surface-white p-8 md:p-16">
          <div className="mb-10 text-center lg:hidden">
            <Logo className="mx-auto mb-6 justify-center" />
          </div>
          {children}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-x-8 gap-y-2 px-margin-mobile text-label-sm text-text-muted">
        <span className="opacity-50">© {new Date().getFullYear()} MojMajstor.ba</span>
        <a href="/uslovi-koristenja" className="transition-colors hover:text-primary">
          Uslovi korištenja
        </a>
        <a href="/politika-privatnosti" className="transition-colors hover:text-primary">
          Politika privatnosti
        </a>
        <a href="/pomoc" className="transition-colors hover:text-primary">
          Pomoć
        </a>
      </div>
    </main>
  );
}

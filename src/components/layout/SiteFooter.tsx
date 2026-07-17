import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { footerLinkGroups } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border-light bg-surface-container-lowest py-16">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <div className="col-span-1">
          <Logo className="mb-6" />
          <p className="text-body-md text-text-muted">
            Vodeća platforma u BiH za povezivanje korisnika sa provjerenim majstorima i uslugama.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-text-muted transition-colors hover:text-primary"
              aria-label="Web stranica"
            >
              <MaterialIcon name="public" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-text-muted transition-colors hover:text-primary"
              aria-label="Društvene mreže"
            >
              <MaterialIcon name="share" />
            </a>
          </div>
        </div>

        {footerLinkGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-6 text-label-lg text-text-main">{group.title}</h4>
            <ul className="space-y-4">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-md text-text-muted underline transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-6 text-label-lg text-text-main">Preuzmite aplikaciju</h4>
          <p className="mb-6 text-body-md text-text-muted">Dostupno na svim mobilnim platformama.</p>
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-text-main px-6 py-3 text-white transition-colors hover:bg-black"
            >
              <MaterialIcon name="phone_iphone" />
              <span className="text-left leading-none">
                <span className="block text-[10px] opacity-70">Download on</span>
                <span className="block font-bold">App Store</span>
              </span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-text-main px-6 py-3 text-white transition-colors hover:bg-black"
            >
              <MaterialIcon name="smartphone" />
              <span className="text-left leading-none">
                <span className="block text-[10px] opacity-70">Get it on</span>
                <span className="block font-bold">Google Play</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-container-max flex-col items-center justify-between gap-4 border-t border-border-light px-margin-mobile pt-8 md:flex-row md:px-margin-desktop">
        <p className="text-center text-body-md text-text-muted">
          © {new Date().getFullYear()} MojMajstor.ba. Sva prava zadržana.
        </p>
        <div className="flex gap-6">
          <span className="text-body-md text-text-muted">BOSANSKI (BIH)</span>
          <span className="text-body-md text-text-muted">BAM (KM)</span>
        </div>
      </div>
    </footer>
  );
}

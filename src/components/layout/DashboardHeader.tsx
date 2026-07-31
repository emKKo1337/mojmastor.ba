/** Sticky title bar reused across the simpler dashboard sub-pages. */
export function DashboardHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center bg-surface-white px-margin-mobile md:px-margin-desktop">
      <h1 className="text-headline-md text-text-main">{title}</h1>
    </header>
  );
}

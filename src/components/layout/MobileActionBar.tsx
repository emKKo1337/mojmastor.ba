import { ProfileContactActions } from "@/components/sections/ProfileContactActions";

interface MobileActionBarProps {
  phone: string;
  craftsmanId: string;
}

/** Sticky bottom call-to-action bar shown on mobile/tablet craftsman profiles. */
export function MobileActionBar({ phone, craftsmanId }: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-light bg-surface-white p-4 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] lg:hidden">
      <ProfileContactActions phone={phone} craftsmanId={craftsmanId} layout="row" size="md" />
    </div>
  );
}

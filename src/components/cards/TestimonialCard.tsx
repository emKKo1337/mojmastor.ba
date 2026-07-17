import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-3xl border border-border-light bg-surface p-8 transition-shadow hover:shadow-xl">
      <div className="mb-6 flex items-center gap-4">
        <Image
          src={testimonial.avatarUrl}
          alt={testimonial.authorName}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h4 className="text-label-lg text-text-main">{testimonial.authorName}</h4>
          <p className="text-label-sm text-text-muted">{testimonial.city}</p>
        </div>
      </div>
      <p className="mb-4 text-body-md italic text-text-main">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-2 text-label-sm text-primary">
        <MaterialIcon
          name={testimonial.badge === "Registrovan majstor" ? "verified_user" : "verified"}
          filled
          className="text-[16px]"
        />
        {testimonial.badge}
      </div>
    </div>
  );
}

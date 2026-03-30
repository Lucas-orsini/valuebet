import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  result?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  result,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-80 p-5 rounded-xl border border-white/[0.07] bg-[#111] flex flex-col gap-3",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5 fill-accent"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-zinc-300 leading-relaxed line-clamp-4">
        &quot;{quote}&quot;
      </p>

      {/* Result Badge */}
      {result && (
        <div className="inline-flex self-start px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="text-[11px] font-medium text-green-400">
            {result}
          </span>
        </div>
      )}

      {/* Author */}
      <div className="mt-auto pt-2 border-t border-white/[0.05]">
        <p className="text-xs font-medium text-zinc-200">{name}</p>
        <p className="text-[11px] text-zinc-500">{role}</p>
      </div>
    </div>
  );
}

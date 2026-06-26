type ActiveFilterCountBadgeProps = {
  count: number;
};

export default function ActiveFilterCountBadge({
  count,
}: ActiveFilterCountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white tabular-nums">
      {count}
    </span>
  );
}

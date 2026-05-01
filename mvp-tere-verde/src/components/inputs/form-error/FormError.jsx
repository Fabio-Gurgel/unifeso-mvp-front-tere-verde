export function FormError({ error }) {
  if (!error) return null;

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <p className="text-[11px] text-red-500 tracking-wide">{error.message}</p>
    </div>
  );
}

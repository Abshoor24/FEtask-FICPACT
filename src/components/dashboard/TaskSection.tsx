export default function TaskSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
        {title}
      </p>
      {children}
    </div>
  );
}

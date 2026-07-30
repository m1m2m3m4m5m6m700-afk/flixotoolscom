const stats = [
  { value: "1.2M+", label: "Tasks processed" },
  { value: "20+", label: "Languages supported" },
  { value: "0.8s", label: "Median response time" },
  { value: "99.9%", label: "Uptime last 12 months" },
];

export function Statistics() {
  return (
    <section id="stats" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-24">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-6 py-10 text-center">
            <p className="font-display text-4xl font-bold text-gradient-brand">{s.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

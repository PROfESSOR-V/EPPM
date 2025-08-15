import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export default function HeroCard({ title, description, cta }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-xl">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mb-6 max-w-md text-lg opacity-90">{description}</p>
      <Link
        href={cta.href}
        className="rounded-full bg-white/20 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/30"
      >
        {cta.label}
      </Link>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
    </div>
  );
}

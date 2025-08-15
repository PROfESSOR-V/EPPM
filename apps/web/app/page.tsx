import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-bold">AI Personal ERP</h1>
      <p className="text-muted">Your daily journal, tasks & repos — auto-organised.</p>
      <Link
        href="/journal"
        className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white"
      >
        Get started
      </Link>
    </section>
  );
}

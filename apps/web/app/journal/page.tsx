import JournalForm from '@/components/JournalForm';

export const metadata = { title: 'Journal' };

export default function JournalPage() {
  return (
    <section className="w-full max-w-2xl space-y-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">Daily Journal</h2>
      <JournalForm />
    </section>
  );
}

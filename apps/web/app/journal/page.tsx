import JournalForm from '@/components/JournalForm';

export const metadata = { title: 'Journal' };

export default function JournalPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Daily Journal</h2>
      <JournalForm />
    </section>
  );
}

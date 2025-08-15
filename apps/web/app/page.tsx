import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* ---------------- Hero ---------------- */}
      <section className="py-20 md:py-32 text-center px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Automate
            </span>{' '}
            your workflow.<br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Accelerate
            </span>{' '}
            your growth.
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Nexus is an AI-native platform that transforms your daily journals into actionable tasks, tracks your
            progress across all your tools, and guides your career path.
          </p>
          <Link
            href="/journal"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            Get Started for Free
          </Link>

          {/* Animated fake console */}
          <div className="mt-20 relative w-full max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-full blur-3xl bg-indigo-500/10" />
            <div className="relative bg-black/20 border border-gray-800 rounded-xl p-8 shadow-2xl text-left">
              <p className="font-mono text-sm leading-relaxed">
                <span className="text-green-400">&gt; nexus.journal.add(&quot;Finish project proposal by Friday, set up a meeting with the design team for tomorrow, and prepare for the client demo on Monday.&quot;)</span>
                <br />
                <span className="text-purple-400">[AI PROCESSING...]</span>
                <br />
                <br />
                <span className="text-cyan-400">Tasks Created:</span>
                <br />
                <span className="text-gray-300">- [ ] Finish project proposal (Deadline: Friday)</span>
                <br />
                <span className="text-gray-300">- [ ] Schedule meeting with design team (Deadline: Tomorrow)</span>
                <br />
                <span className="text-gray-300">- [ ] Prepare for client demo (Deadline: Monday)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------- How it works --------------- */}
      <section className="py-20 bg-black/20 text-center px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">A seamless flow from thought to action.</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Journal',
                desc: 'Write your thoughts, plans, and updates in natural language. No special commands needed.',
                color: 'indigo',
              },
              {
                title: 'Analyze',
                desc: 'Our AI automatically extracts tasks, projects, deadlines, and key metrics in real-time.',
                color: 'purple',
              },
              {
                title: 'Achieve',
                desc: 'See everything organized on your unified dashboard and get intelligent career suggestions.',
                color: 'pink',
              },
            ].map((step, idx) => {
              const colorClasses: Record<string, string> = {
                indigo: 'bg-indigo-600/20 border border-indigo-500 text-indigo-400',
                purple: 'bg-purple-600/20 border border-purple-500 text-purple-400',
                pink: 'bg-pink-600/20 border border-pink-500 text-pink-400',
              };
              return (
                <div key={step.title} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center h-16 w-16 rounded-full text-2xl font-bold mb-4 ${colorClasses[step.color]}`}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 max-w-xs">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------- Features --------------- */}
      <section id="features" className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Your All-in-One Productivity Hub</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Journal & Automation',
                desc: 'Turn unstructured thoughts into structured tasks, calendar events, and project plans effortlessly.',
              },
              {
                title: 'No-Code Agents',
                desc: 'Build custom notification and workflow agents using a simple, intuitive graphical interface.',
              },
              {
                title: 'Live CodeDesk',
                desc: 'Collaborate in real-time with a shared editor, universal preview, and integrated video calls.',
              },
              {
                title: 'Unified Dashboard',
                desc: 'Integrate with GitHub, Vercel, and more to see all your stats and progress in one place.',
              },
              {
                title: 'Career Navigator',
                desc: 'Get personalized job suggestions, track placement prep, and find learning materials.',
              },
              {
                title: 'Real-time Deployment',
                desc: 'Deploy your collaborative projects directly from the CodeDesk with our Vercel integration.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 border border-white/10 bg-white/5 transition hover:bg-white/10 hover:border-white/20 backdrop-blur feature-card"
              >
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------- Footer --------------- */}
      <footer className="border-t border-gray-800 py-8 text-center px-4 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Nexus. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </footer>
    </main>
  );
}

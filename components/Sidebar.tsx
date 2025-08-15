import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineCheckCircle, HiOutlineCog } from 'react-icons/hi';
import clsx from 'clsx';

const items = [
  { label: 'Dashboard', href: '/', icon: <HiOutlineHome /> },
  { label: 'Journal', href: '/journal', icon: <HiOutlineBookOpen /> },
  { label: 'Tasks', href: '/tasks', icon: <HiOutlineCheckCircle /> },
  { label: 'Settings', href: '/settings', icon: <HiOutlineCog /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        'flex flex-col bg-white/60 backdrop-blur dark:bg-slate-800/60',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      <button
        aria-label="Toggle sidebar"
        className="mb-4 mt-3 self-end px-3 text-2xl"
        onClick={() => setCollapsed(!collapsed)}
      >
        ≡
      </button>
      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-lg p-2 hover:bg-primary/10">
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

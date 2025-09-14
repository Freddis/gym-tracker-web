import {FC} from 'react';
import {User} from '../../../utils/openapi-client';
import {cn} from '../../../utils/cn';

export const AppAvatar: FC<{user: Omit<User, 'profilePicture'>, className?: string}> = ({user, className}) => {
  const colors: Record<string, string> = {
    a: 'bg-cyan-700',
    b: 'bg-teal-800',
    c: 'bg-stone-600',
    d: 'bg-blue-800',
    e: 'bg-blue-100',
    f: 'bg-emerald-600',
    g: 'bg-yellow-300',
    h: 'bg-violet-100',
    i: 'bg-lime-600',
    j: 'bg-violet-500',
    k: 'bg-amber-200',
    l: 'bg-pink-300',
    m: 'bg-cyan-400',
    n: 'bg-fuchsia-600',
    o: 'bg-indigo-600',
    p: 'bg-zinc-700',
    q: 'bg-yellow-100',
    r: 'bg-teal-900',
    s: 'bg-yellow-900',
    t: 'bg-red-300',
    u: 'bg-orange-400',
    v: 'bg-lime-200',
    w: 'bg-emerald-700',
    x: 'bg-rose-600',
    y: 'bg-indigo-100',
    z: 'bg-emerald-500',

    0: 'bg-stone-300',
    1: 'bg-zinc-600',
    2: 'bg-lime-100',
    3: 'bg-blue-900',
    4: 'bg-neutral-600',
    5: 'bg-purple-400',
    6: 'bg-teal-300',
    7: 'bg-fuchsia-200',
    8: 'bg-gray-400',
    9: 'bg-slate-200',

    а: 'bg-gray-700',
    б: 'bg-emerald-800',
    в: 'bg-amber-300',
    г: 'bg-rose-300',
    д: 'bg-red-900',
    е: 'bg-red-400',
    ж: 'bg-indigo-800',
    з: 'bg-red-200',
    и: 'bg-teal-200',
    й: 'bg-cyan-100',
    к: 'bg-yellow-800',
    л: 'bg-emerald-100',
    м: 'bg-lime-900',
    н: 'bg-red-800',
    о: 'bg-green-800',
    п: 'bg-slate-400',
    р: 'bg-yellow-400',
    с: 'bg-rose-500',
    т: 'bg-cyan-500',
    у: 'bg-emerald-400',
    ф: 'bg-purple-500',
    х: 'bg-pink-100',
    ц: 'bg-teal-500',
    ч: 'bg-neutral-100',
    ш: 'bg-zinc-400',
    щ: 'bg-sky-500',
    ъ: 'bg-green-500',
    ы: 'bg-slate-700',
    ь: 'bg-teal-400',
    э: 'bg-cyan-900',
    ю: 'bg-stone-900',
    я: 'bg-orange-500',
  };
  const letter = user.name.toLowerCase().substring(0, 1);
  const bg = colors[letter] ?? 'bg-cyan-600';
  return (
    <div className={cn(`text-white font-bold border-light rounded-full w-10 h-10 flex items-center justify-center ${bg}`, className)}>
      {user.name.toUpperCase().substring(0, 1)}
    </div>
  );
};


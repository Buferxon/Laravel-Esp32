import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun, Sunset, Waves } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'sunset', icon: Sunset, label: 'Sunset' },
        { value: 'ocean', icon: Waves, label: 'Ocean' },
        { value: 'system', icon: Monitor, label: 'System' },
        { value: 'mustard', icon: Monitor, label: 'Mustard Dark' },
    ];

    return (
        <div
            className={cn('sunset:bg-neutral-700 ocean:bg-blue-800 inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'sunset:bg-neutral-600 sunset:text-neutral-100 ocean:bg-blue-700 ocean:text-blue-50 bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'sunset:text-neutral-300 sunset:hover:bg-neutral-600/60 ocean:text-blue-200 ocean:hover:bg-blue-700/60 text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}

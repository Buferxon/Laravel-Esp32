import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'sunset' | 'ocean' | 'system' | 'mustard';

const prefersDark = () => window.matchMedia('(prefers-color-scheme: mustard)').matches;

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    const isSunset = appearance === 'sunset';
    const isOcean = appearance === 'ocean';
    const isMustard = appearance === 'mustard';

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('sunset', isSunset);
    document.documentElement.classList.toggle('ocean', isOcean);
    document.documentElement.classList.toggle('mustard', isMustard);
};

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'dark';

    applyTheme(savedAppearance);

    // Add the event listener for system theme changes...
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem('appearance', mode);
        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        updateAppearance(savedAppearance || 'system');

        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}

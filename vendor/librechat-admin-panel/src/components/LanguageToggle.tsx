import { Languages } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '@/hooks';
import i18n from '@/locales/i18n';
import { cn } from '@/utils';

const languageOptions = [
  {
    value: 'en',
    labelKey: 'com_nav_lang_english',
    shortLabel: 'EN',
  },
  {
    value: 'zh-Hans',
    labelKey: 'com_nav_lang_chinese',
    shortLabel: '中',
  },
] as const;

function normalizeLanguage(language?: string) {
  if (language?.toLowerCase().startsWith('zh')) {
    return 'zh-Hans';
  }

  return 'en';
}

export function LanguageToggle() {
  const localize = useLocalize();
  const { i18n: i18next } = useTranslation();
  const currentLanguage = normalizeLanguage(i18next.resolvedLanguage || i18next.language);

  const handleChange = useCallback((language: string) => {
    localStorage.setItem('admin:lang', language);
    void i18n.changeLanguage(language);
  }, []);

  return (
    <div
      role="group"
      aria-label={localize('com_nav_language')}
      className="flex h-9 shrink-0 items-center rounded-lg border border-(--cui-color-stroke-default) bg-(--cui-color-background-panel) p-0.5 text-xs font-semibold"
      title={localize('com_nav_language')}
    >
      <Languages
        className="mx-1 size-4 text-(--cui-color-text-muted)"
        strokeWidth={1.8}
        aria-hidden="true"
      />
      {languageOptions.map((option) => {
        const isActive = currentLanguage === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={localize(option.labelKey)}
            aria-pressed={isActive}
            disabled={isActive}
            onClick={() => handleChange(option.value)}
            className={cn(
              'flex h-7 min-w-8 items-center justify-center rounded-md px-2 text-xs transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--cui-color-stroke-intense)',
              isActive
                ? 'bg-(--cui-color-background-secondary) text-(--cui-color-text-default)'
                : 'text-(--cui-color-text-muted) hover:bg-(--cui-color-background-hover) hover:text-(--cui-color-text-default)',
            )}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

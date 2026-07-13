import { memo, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Languages } from 'lucide-react';
import { TooltipAnchor } from '@librechat/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { normalizeLocale } from '~/locales/i18n';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';

const cookieOptions = { expires: 365 };

function LanguageToggle() {
  const localize = useLocalize();
  const [langcode, setLangcode] = useRecoilState(store.lang);
  const isLanguageLoading = useRecoilValue(store.languageLoading);
  const normalizedLang = normalizeLocale(langcode);

  const options = useMemo(
    () => [
      {
        value: 'en-US',
        locale: 'en',
        label: localize('com_nav_lang_english'),
        shortLabel: 'EN',
      },
      {
        value: 'zh-Hans',
        locale: 'zh-Hans',
        label: localize('com_nav_lang_chinese'),
        shortLabel: '中',
      },
    ],
    [localize],
  );

  const handleChange = useCallback(
    (value: string) => {
      setLangcode(value);
      Cookies.set('lang', value, cookieOptions);

      if (typeof document !== 'undefined') {
        requestAnimationFrame(() => {
          document.documentElement.lang = value;
        });
      }
    },
    [setLangcode],
  );

  return (
    <TooltipAnchor
      description={localize('com_nav_language')}
      render={
        <div
          role="group"
          aria-label={localize('com_nav_language')}
          aria-busy={isLanguageLoading}
          className="flex h-9 shrink-0 items-center rounded-lg border border-border-light bg-surface-primary/80 p-0.5 text-xs font-semibold shadow-sm backdrop-blur"
        >
          <Languages className="ml-1.5 mr-1 size-4 text-text-secondary" aria-hidden="true" />
          {options.map((option) => {
            const isActive = normalizedLang === option.locale;

            return (
              <button
                key={option.value}
                type="button"
                aria-label={option.label}
                aria-pressed={isActive}
                disabled={isActive}
                onClick={() => handleChange(option.value)}
                className={cn(
                  'flex h-7 min-w-8 items-center justify-center rounded-md px-2 text-xs transition-colors',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-heavy',
                  isActive
                    ? 'bg-surface-tertiary text-text-primary shadow-sm'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )}
              >
                {option.shortLabel}
              </button>
            );
          })}
        </div>
      }
    />
  );
}

export default memo(LanguageToggle);

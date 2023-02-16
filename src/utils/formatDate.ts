import { Locale, format, parseISO } from 'date-fns';
import i18n from '../i18n/i18n';

// import ar from 'date-fns/locale/ar-SA';
import ko from 'date-fns/locale/ko';
import en from 'date-fns/locale/en-US';

type Options = Parameters<typeof format>[2];

const getLocale = (): Locale => {
  const locale = i18n.locale.split('-')[0];
  return locale === 'ko' ? ko : en;
};

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Options,
) => {
  const locale = getLocale();
  const dateOptions = {
    ...options,
    locale,
  };
  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions);
};

import { I18n } from 'i18n-js';

import en from './en';
import ko from './ko';

// if English isn't your default language, move Translations to the appropriate language file.
export type Translations = typeof ko;
const i18n = new I18n(ko);
i18n.enableFallback = true;
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 *
 * iOS의 경우에 시스템 언어와 지역을 조합하여 언어코드를 만들어 내는데, 지원하지 않는 언어코드가 나올 수 있다. "ko-US" 같이 나올 수 있다.
 */
i18n.translations = {
  en,
  // 'en-US': en,
  ko,
  // 'ko-KR': ko
};

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

export default i18n;

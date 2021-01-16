import i18n from "roddeh-i18n";

export function t(s) {
  if (document.i18Locale == 'en') {
    return document.en(s);
  } else if (document.i18Locale == 'zh_tw') {
    return document.zh_tw(s);
  } else if (document.i18Locale == 'zh_cn') {
    return document.zh_cn(s);
  }
}
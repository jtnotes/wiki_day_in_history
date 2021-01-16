import i18n from "roddeh-i18n";

export default class Util {
  static initI18(locale) {
    //  Adds data that is used to translate
    // i18n.translator.add({
    //   values: {
    //     "Hello": "こんにちは"
    //   }
    // })

    document.en = i18n.create({
      values: {
        "tab_event": "Events",
        "tab_birth": "Births",
        "tab_death": "Deaths"
      }
    });

    document.zh_tw = i18n.create({
      values: {
        "tab_event": "事件",
        "tab_birth": "出生",
        "tab_death": "死亡"
      }
    });

    document.zh_cn = i18n.create({
      values: {
        "tab_event": "事件",
        "tab_birth": "出生",
        "tab_death": "死亡",
      }
    });

    document.i18Locale = locale;
  }
}

import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
import de from 'dayjs/locale/de'
import es from 'dayjs/locale/es'
import esLA from 'dayjs/locale/es-us'
import frCA from 'dayjs/locale/fr-ca'
import fr from 'dayjs/locale/fr'
import it from 'dayjs/locale/it'
import ja from 'dayjs/locale/ja'
import ko from 'dayjs/locale/ko'
import nl from 'dayjs/locale/nl'
import pl from 'dayjs/locale/pl'
import ptBR from 'dayjs/locale/pt-br'
import pt from 'dayjs/locale/pt'
import ru from 'dayjs/locale/ru'
import zhCN from 'dayjs/locale/zh-cn'
import zhTW from 'dayjs/locale/zh-tw'

const langMap = {
  'en-US': en,
  'de-DE': de,
  'es-ES': es,
  'es-LA': esLA,
  'fr-CA': frCA,
  'fr-FR': fr,
  'it-IT': it,
  'ja-JP': ja,
  'ko-KR': ko,
  'nl-NL': nl,
  'pl-PL': pl,
  'pt-BR': ptBR,
  'pt-PT': pt,
  'ru-RU': ru,
  'zh-CN': zhCN,
  'zh-TW': zhTW
}

export function setDateTranslations(lang) {
  dayjs.locale(lang, langMap[lang])
}

import { pt } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'

export default defaultConfig({
  locales: { pt },
  locale: 'pt',
  config: {
    rootClasses,
  },
})

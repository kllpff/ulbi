import { useTranslation } from 'react-i18next'
import { Page } from 'shared/ui/Page/ui/Page'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  )
}

export default MainPage

import { SxProps, Theme } from '@mui/material';
import { FC } from "react"
import { observer } from "mobx-react-lite"
import { Page } from "../../components"
import { useStores } from "../../stores"

const TestPage = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores()

  return (
    <Page title="Test" sx={styles.page}>
      <h1>Test</h1>
      <h1>Test</h1>
    </Page>
  )
})

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  }
}

TestPage.displayName = 'TestPage';

export default TestPage;
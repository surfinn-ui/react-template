import { SxProps, Theme } from '@mui/material';
import { FC } from "react"
import { observer } from "mobx-react-lite"
import { Page } from "../../components"
import { useStores } from "../../stores"

const Test2Page = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores()

  return (
    <Page title="Test2" sx={styles.page}>
      <p>Test2</p>
      <p>Test2</p>
    </Page>
  )
})

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  }
}

Test2Page.displayName = 'Test2_Page';

export default Test2Page;
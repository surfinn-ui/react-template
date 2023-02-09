import { observer } from "mobx-react-lite"

export interface ITestProps {
}

/**
 * Describe your component here
 */
export const Test = observer((props: ITestProps) => {
  return (
    <>
      test
    </>
  )
})

Test.displayName = 'Test_Component'


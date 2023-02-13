import { BoxProps } from "@mui/material"
import { observer } from "mobx-react-lite"

export interface ITest3Props extends BoxProps {
}

/**
 * Describe your component here
 */
export const Test3 = observer((props: ITest3Props) => {
  return (
    <>
      test3
    </>
  )
})

Test3.displayName = 'Test3_Component'


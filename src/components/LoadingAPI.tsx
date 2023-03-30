import { Box, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../models';
import { DialogAnimate } from './animate';
import ProgressBar from './progress-bar/ProgressBar';

/**
 * ## 기본 사용법
 *
 * > LoadingPage 컴포넌트입니다.
 * > 여러 개의 입력 폼 세트가 필요한 경우 코드를 복사하여 새로운 컴포넌트를 생성합니다.
 * >
 * > 컴포넌트 네이밍은 해당 서비스명 뒤에 "FormSet"을 붙여서 사용합니다
 * > 예) VOCFormSet, AlarmFormSet
 *>
 * > ### Common Style
 * > * **formSetLabelStyle** : Form의 Label에 사용합니다.
 * > * **searchRowStyle**: tr 태그에 사용합니다.
 *
 */
const LoadingAPI = observer(function LoadingPageProps() {
  const rootStore = useStores();
  // const { loadingStore } = rootStore;

  return (
    <DialogAnimate
      // open={loadingStore.loading}
      open={false}
      PaperProps={{
        style: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          overflow: 'hidden',
          textAlign: 'center',
          maxWidth: '100%',
        },
      }}
      slots={{
        backdrop: () => (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.125)',
            }}
          ></Box>
        ),
      }}
      sx={{ maxWidth: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProgressBar />
        <CircularProgress sx={{ width: 70, height: 70 }} color={'info'} />
      </Box>
    </DialogAnimate>
  );
});

export default LoadingAPI;

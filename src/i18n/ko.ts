// import { LocaleConfig } from 'react-native-calendars';

// // prettier-ignore
// // NOTE - 캘린더 언어 설정
// // eslint-disable-next-line dot-notation
// LocaleConfig.locales['ko'] = {
//   monthNames: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
//   monthNamesShort: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
//   dayNames: [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
//   dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
//   today: "오늘",
// };

const ko = {
  common: {
    appName: 'PaniCare',
    ok: '확인!',
    cancel: '취소',
    back: '뒤로',
    logOut: '로그아웃',
    close: '닫기',
  },

  prescriptionScreen: {
    button: '복용알림',
  },

  welcomeScreen: {
    postscript:
      '잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ',
    readyForLaunch: '출시 준비가 거의 끝난 나만의 앱!',
    exciting: '(오, 이거 신나는데요!)',
    letsGo: '가보자구요!',
  },

  errorScreen: {
    title: '뭔가 잘못되었습니다!',
    friendlySubtitle:
      '이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.',
    reset: '초기화',
    traceTitle: '%{name} 스택에서의 오류',
  },

  emptyStateComponent: {
    generic: {
      heading: '앗! 데이터를 찾을 수 없어요.',
      content:
        '데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.',
      button: '다시 시도해봅시다',
    },
  },

  errors: {
    invalidLoginId: '잘못된 로그인 ID 입니다.',
    invalidEmail: '잘못된 이메일 주소 입니다.',
    invalidPhoneNumber: '잘못된 전화번호 입니다.',
  },

  loginScreen: {
    screenName: '로그인',
    signIn: '로그인',
    enterDetails:
      '앱을 사용하려면 로그인하셔야 합니다. \n담당의사님께 요청하세요.',
    idFieldLabel: '',
    emailFieldLabel: '',
    passwordFieldLabel: '',
    idFieldPlaceholder: '로그인 ID를 입력하세요',
    emailFieldPlaceholder: '이메일을 입력하세요',
    passwordFieldPlaceholder: '아주 비밀스러운 암호를 입력하세요',
    tapToSignIn: '로그인',
    hint: '힌트: 로그인ID와 비밀번호를 입력하세요',
  },

  signup: {
    screenName: '회원가입',
    submitButtonLabel: '휴대폰 본인 인증',
    authentication: {
      screenName: '회원가입',
      submitButtonLabel: '휴대폰 본인 인증',
      describe: "본 프로그램 PaniCare 앱을 사용하기 위한 본인인증을 진행합니다."
    },
    userInfo: {
      name: '아이디',
      namePlaceholder: '아이디를 입력하세요',
      nameHelper: '아이디를 입력하세요',
      password: '비밀번호',
      passwordPlaceholder: '비밀번호를 입력하세요',
      passwordHelper: '비밀번호는 대소문자, 숫자, 특수문자를 포함한 8자 이상으로 만드세요',
      passwordConfirm: '비밀번호 확인',
      passwordConfirmPlaceholder: '비밀번호를 한번 더 입력하세요',
      passwordConfirmHelper: '동일한 비밀번호를 한번 더 입력하세요',
      submitButton: '회원가입',
    }
  },

  introduction: {
    screenName: '앱소개',
    skipButtonLabel: '건너뛰기',
    skipButtonLabelAfterDone: '닫기',
  },

  homeScreen: {
    button: {
      gotoTraining: '나의 훈련',
      gotoJournal: '증상 기록하기',
    },
    message: {
      welcome: '{{name}}님 안녕하세요.',
      dailyMention: `
        {{name}}님, 너무너무너무 잘하고 있어요! 우리함께 오늘의 훈련을 시작해보아요.
        {{name}}님, 너무너무너무 잘하고 있어요! 우리함께 오늘의 훈련을 시작해보아요.
        {{name}}님, 너무너무너무 잘하고 있어요! 우리함께 오늘의 훈련을 시작해보아요.
        {{name}}님, 너무너무너무 잘하고 있어요! 우리함께 오늘의 훈련을 시작해보아요.
        `,
    },
  },

  demoNavigator: {
    componentsTab: '컴포넌트',
    debugTab: '디버그',
    communityTab: '커뮤니티',
    podcastListTab: '팟캐스트',
  },

  demoCommunityScreen: {
    title: '커뮤니티와 함께해요',
    tagLine:
      '전문적인 React Native 엔지니어들로 구성된 Infinite Red 커뮤니티에 접속해서 함께 개발 실력을 향상시켜 보세요!',
    joinUsOnSlackTitle: 'Slack 에 참여하세요',
    joinUsOnSlack:
      '전 세계 React Native 엔지니어들과 함께할 수 있는 곳이 있었으면 좋겠죠? Infinite Red Community Slack 에서 대화에 참여하세요! 우리의 성장하는 커뮤니티는 질문을 던지고, 다른 사람들로부터 배우고, 네트워크를 확장할 수 있는 안전한 공간입니다. ',
    joinSlackLink: 'Slack 에 참여하기',
    makeIgniteEvenBetterTitle: 'Ignite 을 향상시켜요',
    makeIgniteEvenBetter:
      'Ignite 을 더 좋게 만들 아이디어가 있나요? 기쁜 소식이네요. 우리는 항상 최고의 React Native 도구를 구축하는데 도움을 줄 수 있는 분들을 찾고 있습니다. GitHub 에서 Ignite 의 미래를 만들어 가는것에 함께해 주세요.',
    contributeToIgniteLink: 'Ignite 에 기여하기',
    theLatestInReactNativeTitle: 'React Native 의 최신정보',
    theLatestInReactNative:
      'React Native 가 제공하는 모든 최신 정보를 알려드립니다.',
    reactNativeRadioLink: 'React Native 라디오',
    reactNativeNewsletterLink: 'React Native 뉴스레터',
    reactNativeLiveLink: 'React Native 라이브 스트리밍',
    chainReactConferenceLink: 'Chain React 컨퍼런스',
    hireUsTitle: '다음 프로젝트에 Infinite Red 를 고용하세요',
    hireUs:
      '프로젝트 전체를 수행하든, 실무 교육을 통해 팀의 개발 속도에 박차를 가하든 상관없이, Infinite Red 는 React Native 프로젝트의 모든 분야의 에서 도움을 드릴 수 있습니다.',
    hireUsLink: '메세지 보내기',
  },
  demoShowroomScreen: {
    jumpStart: '프로젝트를 바로 시작할 수 있는 컴포넌트들!',
    lorem2Sentences:
      '별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경(憧憬)과, 별 하나에 시와, 별 하나에 어머니, 어머니',
    demoHeaderTxExample: '야호',
    demoViaTxProp: '`tx` Prop 을 통해',
    demoViaSpecifiedTxProp: '`{{prop}}Tx` Prop 을 통해',
  },
  demoDebugScreen: {
    howTo: '사용방법',
    title: '디버그',
    tagLine:
      '축하합니다. 여기 아주 고급스러운 React Native 앱 템플릿이 있습니다. 이 보일러 플레이트를 사용해보세요!',
    reactotron: 'Reactotron 으로 보내기',
    reportBugs: '버그 보고하기',
    demoList: '데모 목록',
    demoPodcastList: '데모 팟캐스트 목록',
    androidReactotronHint:
      '만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후, 터미널에서 adb reverse tcp:9090 tcp:9090 을 실행한 다음 앱을 다시 실행해보세요.',
    iosReactotronHint:
      '만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.',
    macosReactotronHint:
      '만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.',
    webReactotronHint:
      '만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.',
    windowsReactotronHint:
      '만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.',
  },
  demoPodcastListScreen: {
    title: 'React Native 라디오 에피소드',
    onlyFavorites: '즐겨찾기만 보기',
    favoriteButton: '즐겨찾기',
    unfavoriteButton: '즐겨찾기 해제',
    accessibility: {
      cardHint:
        '에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.',
      switch: '즐겨찾기를 사용하려면 스위치를 사용하세요.',
      favoriteAction: '즐겨찾기 토글',
      favoriteIcon: '좋아하는 에피소드',
      unfavoriteIcon: '즐겨찾기하지 않은 에피소드',
      publishLabel: '{{date}} 에 발행됨',
      durationLabel: '소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초',
    },
    noFavoritesEmptyState: {
      heading: '에피소드 즐겨찾기 없어요.',
      content: '에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.',
    },
  },
};

export default ko;

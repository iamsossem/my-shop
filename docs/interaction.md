# 인터랙션 목록 및 모바일 처리 제안

골라담냥 프로젝트에 구현된 인터랙션 41개를 정리하고, 모바일에서 어떻게 처리할지 제안한다.

- 공통 13개 · P01 홈 11개 · P02 박스 만들기 9개 · P04 장바구니 4개 · P03 정기배송 신청 4개

## 분석 전제

- **CSS에 화면 너비 기준 미디어쿼리가 하나도 없다.** 지금 있는 `@media`는 전부 `prefers-reduced-motion`(모션 줄이기 설정)용이라, 모바일 레이아웃 자체가 아직 정의되지 않았다.
- **모션 줄이기 설정을 끄는 장치는 이미 잘 들어가 있다.** 대부분의 모션이 OS의 '모션 줄이기' 설정을 따르도록 처리되어 있어, 모바일 대응도 이 구조를 그대로 확장하면 된다.

## 공통 (전 페이지)

| 번호 | 인터랙션 이름 | 위치 | 모바일 처리제안 | 제안이유 |
|---|---|---|---|---|
| 1 | 페이지 전환 모션 (View Transitions, 나갈 때 흐려지고 들어올 때 떠오름) | `src/styles/base.css`, 링크마다 `viewTransition` | 유지 | 앱처럼 느껴지게 하는 데 효과가 크고 가벼움. 시간이 0.4초 정도라 모바일에서도 거슬리지 않음 |
| 2 | 페이지 이동 시 맨 위로 스크롤 | `src/App.jsx` (`ScrollToTop`) | 유지 | 화면이 긴 모바일에서 꼭 필요한 기본 동작 |
| 3 | 스크롤 등장 모션 (`data-reveal`, 아래에서 떠오르고 순서대로 0.09초씩 늦게) | `src/utils/useScrollReveal.js`, `src/styles/base.css` | 축소 | 모바일은 한 줄로 쌓여 순서 지연이 줄줄이 이어져 답답해 보임. 지연 시간과 이동 거리를 줄이는 것이 좋음 |
| 4 | 고양이 발바닥 커서 (기본 커서 숨김, 버튼 위에서 커짐) | `src/components/PawCursor.jsx` | 제거 | 터치 화면에는 커서가 없음. 이미 `pointer: fine`일 때만 켜지므로 지금 동작 그대로면 됨 |
| 5 | 클릭 발도장 (누른 자리에 발자국이 찍혔다 사라짐) | `src/components/PawCursor.jsx` (`onDown`) | 제거 | 마우스 전용 기능이고 4번과 함께 이미 꺼져 있음. 터치용으로 다시 만들 필요 없음 |
| 6 | 상단 메뉴 현재 페이지 표시 (회색 알약 모양) + hover | `src/components/NavBar.jsx`, `src/components/NavBar.css` | 유지 | 현재 위치를 알려 주는 필수 표시. hover만 터치에서 의미가 없어짐 |
| 7 | 장바구니 배지가 튀어 오름 (`cart:landed` 이벤트) | `src/components/NavBar.jsx`, `src/components/NavBar.css` | 유지 | 담기 결과를 알려 주는 핵심 피드백. 0.6초로 짧음 |
| 8 | 숫자가 굴러가며 바뀜 (RollingText: 칸 수, 금액) | `src/components/RollingText.jsx` | 유지 | 변화가 작고 금액이 바뀐 걸 알아보기 쉬움. 모션 줄이기 대응도 이미 있음 |
| 9 | 가격 요약의 무료배송 진행 바 채우기 | `src/components/PriceSummary.jsx` | 유지 | 30,000원 기준을 직관적으로 보여 주는 핵심 정보 |
| 10 | 무료배송 달성 시 빛이 계속 흐름 (`free-shine`, 무한 반복) | `src/components/PriceSummary.css` | 축소 | 무한 반복이라 배터리와 시선을 계속 잡아끔. 1~2회만 재생하고 멈추는 것을 권장 |
| 11 | 무료배송 달성 축하 폭죽 (입자 14개) | `src/components/PriceSummary.jsx` | 유지 | 한 번만 터지는 짧은 보상 모션. 입자 수만 줄여도 충분 |
| 12 | 핵심/보조/더보기 버튼 hover | `src/components/Buttons.css` | 축소 | 터치에는 hover가 없음. 누르는 순간(`:active`) 반응으로 바꾸고 hover는 `(hover: hover)`일 때만 적용 |
| 13 | 푸터 링크 hover | `src/components/Footer.css` | 축소 | 12번과 같은 이유. 모바일에서는 누를 수 있는 영역을 넓히는 쪽이 더 중요함 |

## P01 홈

| 번호 | 인터랙션 이름 | 위치 | 모바일 처리제안 | 제안이유 |
|---|---|---|---|---|
| 14 | 히어로 격자 왜곡 배경 (WebGL, 마우스를 따라 끌려감 + 혼자 떠도는 움직임) | `src/components/GridDistortion.jsx`, `src/pages/Home.jsx` | 제거 | 전체 화면 WebGL을 계속 그려서 발열과 배터리 소모가 큼. 터치로 화면을 밀면 스크롤과 겹치고, 커서가 없으면 혼자 떠도는 움직임만 남음. 정지 이미지로 대체 권장 |
| 15 | 히어로 클릭 물결 (`clickRipple`) | `src/components/GridDistortion.jsx` (`onPointerDown`) | 제거 | 14번과 함께 제거. 화면을 탭하면 의도치 않게 물결이 생김 |
| 16 | 히어로 시작 시 흩어졌다 맞춰지는 효과 (`intro`, scramble) | `src/components/GridDistortion.jsx` (`scramble`) | 제거 | 14번이 빠지면 함께 빠짐. 첫 화면 로딩도 빨라짐 |
| 17 | 히어로 제목이 줄마다 올라오고 형광 밑줄이 그어짐 | `src/pages/Home.jsx`, `src/pages/Home.css` | 유지 | 첫인상을 만드는 핵심 연출이고 CSS라 가벼움. 지연 시간 합계(약 1.7초)만 조금 줄이면 좋음 |
| 18 | 띠 배너 무한 흐름 + hover 시 멈춤 | `src/components/Marquee.jsx`, `src/components/Marquee.css` | 유지 | 가벼운 CSS 애니메이션이고 정보 전달 역할도 함. 터치에서는 hover로 멈출 수 없다는 점만 감안 |
| 19 | 베스트 박스 3D 기울기 + 빛 반사 | `src/pages/Home.jsx` (`BestBox`), `src/pages/Home.css` | 제거 | `mousemove` 기반이라 터치에서는 동작하지 않거나 기울어진 채 멈출 수 있음 |
| 20 | 베스트 박스 hover 시 사진 확대 | `src/pages/Home.css` | 제거 | 터치에서는 탭한 뒤 확대된 상태로 남는 문제가 생김 |
| 21 | 구성품 hover/focus 시 사진 속 간식 위치 표시 (반짝이며 깜빡임) | `src/pages/Home.jsx` (`BestBox`), `src/pages/Home.css` | 축소 | 내용 전달 기능이라 남길 가치가 있음. hover 대신 탭하면 켜지고 꺼지는 방식으로 바꾸고, 무한 깜빡임은 빼는 것을 권장 |
| 22 | 간식 세트 자동 슬라이드 (4초마다 무한 반복, 진행 점, 화살표) | `src/components/SnackSetSlider.jsx` | 축소 | 카드 너비가 300px로 고정이라 좁은 화면에서는 계산이 어긋남. 손가락으로 밀어 넘기기(scroll-snap)로 바꾸고 화살표는 빼거나 작게 줄이는 것이 좋음 |
| 23 | 슬라이더 hover 시 자동 넘김 멈춤 + 카드 hover | `src/components/SnackSetSlider.jsx`, `src/components/SnackSetSlider.css` | 제거 | 터치에서는 hover가 동작하지 않음. 손으로 넘기는 동안 자동 넘김을 멈추는 방식이 필요함 |
| 24 | 3단계 흐름도가 순서대로 등장 | `src/components/StepFlow.jsx` | 축소 | 모바일에서는 세로로 쌓여서 순서 지연과 가로 화살표가 어색해짐. 화살표를 아래 방향으로 바꾸고 지연은 줄이는 것을 권장 |

## P02 박스 만들기

| 번호 | 인터랙션 이름 | 위치 | 모바일 처리제안 | 제안이유 |
|---|---|---|---|---|
| 25 | 간식 담기 비행 모션 (사진 6장이 꼬리처럼 박스 칸으로 날아감) | `src/utils/flyToBox.js` (`flyToBox`), `src/pages/BoxBuilder.jsx` | 축소 | 모바일에서는 박스가 화면 밖(아래쪽)에 있을 가능성이 커서 날아갈 목적지가 보이지 않음. 1장, 0.6초 정도로 줄이거나 하단 고정 미니 박스로 날리는 것을 권장 |
| 26 | 담기 중인 카드 강조 + 나머지 카드 흐리게 | `src/pages/BoxBuilder.jsx`, `src/pages/BoxBuilder.css` | 유지 | 지금 누른 카드를 알려 주는 피드백. 1초로 짧음 |
| 27 | 간식 카드 hover + 스테퍼(−/+) 버튼 hover | `src/components/SnackCard.css`, `src/components/Stepper.css` | 축소 | hover는 빼고, 버튼 크기는 최소 44px로 맞춰야 함 |
| 28 | '○팩 담김' 배지 표시 | `src/components/SnackCard.jsx` | 유지 | 담은 상태를 알려 주는 정보라 꼭 필요함 |
| 29 | 박스 칸이 톡 튀며 채워짐 + 채워진 칸 탭하면 비우기 | `src/components/LunchBox.jsx`, `src/components/LunchBox.css` | 유지 | 핵심 조작이고 가벼움. 다만 칸이 작아서 실수로 누를 수 있으니 누르는 영역은 확인 필요 |
| 30 | 8칸 완성 연출 (박스가 튀고, 빛나고, 반짝이 16개 + 버튼에 빛이 지나감) | `src/components/LunchBox.jsx`, `src/components/LunchBox.css` | 축소 | 핵심 보상 순간이라 남기되, 반짝이 수와 겹치는 효과를 줄이는 것을 권장 |
| 31 | 오른쪽 요약 영역 화면 고정 (`sticky`) | `src/pages/BoxBuilder.css` (`.builder__aside`) | 축소 | 한 줄 레이아웃에서는 `sticky`가 의미 없거나 화면을 가림. '○/8칸 · 합계 · 담기' 정도만 하단 고정 바로 바꾸는 것을 권장 |
| 32 | 장바구니 담기 모션 (도시락이 상단 장바구니로 날아감) | `src/utils/flyToBox.js` (`flyBoxToCart`), `src/pages/BoxBuilder.jsx` | 유지 | 상단 메뉴는 모바일에서도 보이고 1초로 짧음. 메뉴가 햄버거 메뉴로 접히면 목적지를 다시 정해야 함 |
| 33 | 담기 완료 알림 (토스트, 4초 뒤 사라짐 + 장바구니 링크) | `src/pages/BoxBuilder.jsx`, `src/pages/BoxBuilder.css` | 유지 | 모바일에서 특히 유용한 피드백. 31번의 하단 바와 겹치지 않게 위치만 조정 |

## P04 장바구니

| 번호 | 인터랙션 이름 | 위치 | 모바일 처리제안 | 제안이유 |
|---|---|---|---|---|
| 34 | 박스 선택 시 카드가 튀고 테두리가 퍼짐 + 체크 표시 | `src/pages/Cart.jsx` (`CartBox`) | 유지 | 짧은(0.45초) 선택 피드백이라 터치 조작과 잘 맞음 |
| 35 | 전체 선택 체크박스 | `src/pages/Cart.jsx` | 유지 | 기능 요소라 꼭 필요함 |
| 36 | 삭제 시 카드가 오른쪽으로 밀려 사라지고 자리가 접힘 | `src/pages/Cart.jsx` (`CartBox`) | 유지 | 삭제 결과를 이해하기 쉬움. 모바일에서는 밀어서 삭제하는 제스처와 잘 어울림 |
| 37 | 장바구니 카드 hover, 삭제 버튼 hover | `src/pages/Cart.css` | 축소 | 터치에서는 hover가 없으니 `:active`로 대체 |

## P03 정기배송 신청

| 번호 | 인터랙션 이름 | 위치 | 모바일 처리제안 | 제안이유 |
|---|---|---|---|---|
| 38 | 입력칸 포커스 시 밑줄이 차오르고, 다 적으면 체크가 튀어나옴 | `src/pages/Subscribe.jsx` (`Field`) | 유지 | 입력 완료를 알려 주는 피드백이고 가벼움. 키패드 종류(`type="tel"`)도 이미 맞게 지정됨 |
| 39 | 왼쪽 고양이 이미지 화면 고정 (`sticky`) | `src/pages/Subscribe.css` | 제거 | 한 줄 레이아웃에서는 입력폼을 밀어냄. 이미지를 작게 줄이거나 숨기는 것을 권장 |
| 40 | 신청 완료 팝업 + 확인 누르면 홈으로 이동 | `src/pages/Subscribe.jsx` | 유지 | 완료를 알리는 필수 흐름. 모바일에서는 하단 시트 형태도 고려할 만함 |
| 41 | 신청 버튼 비활성 처리 (박스가 없을 때) | `src/pages/Subscribe.jsx` | 유지 | 기능 요소라 꼭 필요함 |

## 처리제안 요약

| 처리제안 | 개수 | 해당 번호 |
|---|---|---|
| 유지 | 20 | 1, 2, 6, 7, 8, 9, 11, 17, 18, 26, 28, 29, 32, 33, 34, 35, 36, 38, 40, 41 |
| 축소 | 12 | 3, 10, 12, 13, 21, 22, 24, 25, 27, 30, 31, 37 |
| 제거 | 9 | 4, 5, 14, 15, 16, 19, 20, 23, 39 |

## 우선 적용 권장

모바일 대응에서 가장 효과가 큰 것은 다음 세 가지다.

1. 히어로 WebGL을 정지 이미지로 바꾸기 (14~16번)
2. hover 스타일을 `@media (hover: hover)` 안으로 옮기기 (12, 13, 20, 23, 27, 37번)
3. 박스 만들기의 오른쪽 고정 영역을 하단 고정 바로 바꾸기 (31번)

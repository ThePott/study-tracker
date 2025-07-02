# ███████ ███████ 
# ██      ██      
# █████   █████   
# ██      ██      
# ██      ███████

# ==== 완료 ====
## 성능 개선
## 서버에 보내기
- 버튼 눌러서 서버에 보내기

# ==== 숙제 ====
[완] 성능 개선
[ ] 서버에서 권별로 받아오기
    서버에선 책 제목 배열, 분류 객체를 보냄
        setResponse로 몽땅 집어 넣는다
        그러면 메인 페이지에서 response 바탕으로 책 제목 배열을 만들어 넣는다
        책이 선택되면 response에서 해당 내용을 고른다 -> reviewCheckDataArray를 변경한다

# ==== 질문 ====
- review-check/Header가 보일 땐 레이아웃의 StudentHeader을 숨기고 싶습니다
    - querySelector를 하듯이 해당 컴포넌트를 (예를 들어 review-check/page 로) 가져온 다음 클래스네임을 토글하는 게 가능할까요?
    - 헤더를 도중에 바꾸는 일반적인 방법은 무엇인가요? (혹은 헤더는 바뀌지 않아야 하나요?)
- 상태를 부모로부터 받아와야 하는데 리렌더를 피할 방법
    - `review-check/Header`의 `editedIdStatusDictArray`

# ==== 지금 할 것 ====
- 다중 선택 끄고 켤 수 있게
    다중 선택 꺼지면 다중 선택 안 되게 ---- recentTwo 건드리지 않게
    다중 선택 꺼지면 클릭하는 게 상태가 순환하게
    - 현재 구조: 
        클릭 
        -> `useCheckboxClickHandler` 안의 `updateRecentTwoIndexes` 실행 
        -> `recentTwoIndexes` 만든 `useCheckboxStatus`가 `statusArray` 업데이트
        -> `statusArray`의 원소를 체크박스가 받음
    - 개선 계획
        1. `statusArray`의 의존성 배열에 `isMultiselecting`을 추가
        2. `isMultiselecting`에 따라 두 케이스로 나눔

# ==== 학생 페이지의 UI에서 남은 것 ====
- 학생 측에서 5가지 상태 조작 모두 가능하게
- 색깔 좀 더 예쁘게

---- 백엔드 필요 ----
- 권별로 나눠서 들어가는 단계: 문제집 선택 -> 체크박스, 뒤로가기
- topic __step: [...data] 형태로 정리되어서 서버에서 받은 다음 구역 나눠서 체크박스 보이게 하기 <-- 이거 하면 index 번호 이어지게 하는 게 어려울 수 있겠다.



# ==== 나중에 할 것 ====
## 자료 조작
- 학생측에서 완료로 바꿔서 저장

## 권별 분류 UI
- 오답과제 탭 들어가면 권별 선택 가능해야

## UI 기능 추가
- 가장 왼쪽 열에는 페이지만 있게 하기
- topic __step 보이게 하기
- snackbar로 서버에 전송 완료, 실패가 뜨게 함

## 성능 개선
- 서버 요청 줄이기
    - 상태 바뀔 때 effect 함수에 set interval 걺 -> 재호출마다 cleanup -> 2초 지나서 cleanup 안 되면 서버에 전송
- 리렌더 줄이기
    - review-check/Header가 editedIdStatusDictArray를 받아서 이게 수정될 때마다 리렌더 됨
    - 세터 함수를 받아와서 거기서 상태를 추줄하는 방법이 있을까?


## 스크롤 조작
- 완료가 아닌 첫 번째 네모가 위에서 두 번째 줄에 로딩되게 하기
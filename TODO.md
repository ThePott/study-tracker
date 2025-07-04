# ███████ ███████ 
# ██      ██      
# █████   █████   
# ██      ██      
# ██      ███████

# ==== 목표 ====
2. 서버에 자동 저장 요청
    - 상태 바뀔 때 effect 함수에 set interval 걺 -> 재호출마다 cleanup -> 2초 지나서 cleanup 안 되면 서버에 전송
    - 혹은 unmount 되면 요청 <-- 홈페이지 꺼질 때에도 작동할까?
3. 서버 요청 스낵바
4. 스켈레톤

5. 버튼 매니 헤더 만들기
6. 버튼 매니 헤더 클릭한 색으로 수정되게 하기

7. 다중 선택 끄기 기능
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

8. url 나누기:      review-check        review-check/:bookId
    // current url review check 이면 student header말고 버튼 그룹으로 렌더링 처리
    // 현재 url만 가져와서 플래그 변수 
    // 권별 선택, 문제별 선택 url 나누기
    // /books   -> /:bookId

    // 헤더의 show 여부를 className 줘서 display: none; 으로 감추기
## grouped-by-page로 branch 만들기
8. page로 group -> step으로 group
9. [step, page, index] 형식의 인덱스 만들기
10. 배열 인덱스로 다중 선택 되게 하기
---- 여기까지 되면 다시 머지

11. 페이지별로 구분해서 보여주기
12. topic __step이 보이게 하기
---- 여기까지만 하기

# ==== 완료 ====
1. 패딩 맞추기: grid auto fit, minmax(60px, 1fr)
2. 자동 저장
    2-1. setTimeout -> clearTimeout
    2-2. 혹은 unmount 되면 요청 / LIMITATION: 홈페이지 꺼질 땐 자동 저장 안 됨


# ==== 지금 할 것 ====
2. 자동 저장
    2-3. 패치 요청 성공하면 지금을 초깃값으로 초기화해야


# ==== 나중에 할 것 ====
## 스크롤 조작
- 완료가 아닌 첫 번째 네모가 위에서 두 번째 줄에 로딩되게 하기

## 지금 헤더 기본 너비가 너무 큼 -> MUI 써서 더 짧게 만들어야

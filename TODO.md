# ███████ ███████ 
# ██      ██      
# █████   █████   
# ██      ██      
# ██      ███████ 

# ==== 목표 ====
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
## ----branch 나누기 ----> grouped-by-page로 branch
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
3. 서버 요청 인디케이터
    3-1. 응답 상태 동그라미 불빛으로 보여줌
    3-2. 실패하면 스낵바(토스트)로 에러 메시지 보여줌
4. 스켈레톤
    4-1. book section 스켈레톤 / LIMITATION: 비동기 렌더링은 없으므로 checkbox들은 일부만 로딩하는 걸로 로직을 바꿔야 함

# ==== 지금 할 것 ====
5. 버튼 매니 헤더 만들기 <-- 버튼 그룹 이용해서 내가 만들어야 함
    아니면 tab으로 한 다음에 value에 따라서 색을 바꾸자 <--- 이게 더 나을 거 같기도 하다> // 탭은 색상이 제한적, 버튼 그룹 써야
    


# ==== 나중에 할 것 ====
## 스크롤 조작
- 완료가 아닌 첫 번째 네모가 위에서 두 번째 줄에 로딩되게 하기

## 지금 헤더 기본 너비가 너무 큼 -> MUI 써서 더 짧게 만들어야

## 변수 더 깔끔하게 정리
    SIDE_QUEST_1: id status dict array -> { id1: status1, id2: status2, ... }

## 로딩 최적화
    loader 써서 미리 fetch하자.

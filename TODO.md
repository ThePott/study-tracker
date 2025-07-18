# ███████ ███████ 
# ██      ██      
# █████   █████   
# ██      ██      
# ██      ███████ 

# ==== 버그 ====
오답 체크
    체크박스가 안 뜰 때가 있음 ---- 재현이 잘 안 되네

# ==== 목표 ====
## 강사 레이아웃

## 강사 ---- 진도표

## 학생 ---- 진도표

# ==== 완료 ====
1. 강사 레이아웃 짜기

# ==== 할 것 ====





# 최종 구현 목표
1. 강사
    a. 요약 페이지에서 칸반
    b. 진도표에서 할당, 새 숙제 등록
2. 학생
    a. 진도표 페이지
    b. 요약 페이지
3. 로그인 페이지 구현



































#

# ==== 목표 ====

4. 상단은 tabs로 바꾸기


3. url 나누기:      review-check        review-check/:bookId
    // current url review check 이면 student header말고 버튼 그룹으로 렌더링 처리
    // 현재 url만 가져와서 플래그 변수 
    // 권별 선택, 문제별 선택 url 나누기
    // /books   -> /:bookId

    // 헤더의 show 여부를 className 줘서 display: none; 으로 감추기
4. 
## ----branch 나누기 ----> grouped-by-page로 branch
8. page로 group -> step으로 group
9. [step, page, index] 형식의 인덱스 만들기
10. 배열 인덱스로 다중 선택 되게 하기
---- 여기까지 되면 다시 머지

11. 페이지별로 구분해서 보여주기
12. topic __step이 보이게 하기
---- 여기까지만 하기

# ==== 완료 ====
1. 자동 저장 버그 해결
2. 다중 선택 끄기 기능 추가
3. toggle button group 밑으로
    oklch

# ==== 지금 할 것 ====

# ==== 나중에 할 것 ====

컴포넌트를 거치지 않고 edited array를 만들 수 있지 않을까?
click -> two indexes -> status array -> ( 지금은 컴포넌트 effect function 에서 update  )

## 스크롤 조작
- 완료가 아닌 첫 번째 네모가 위에서 두 번째 줄에 로딩되게 하기

## 지금 헤더 기본 너비가 너무 큼 -> MUI 써서 더 짧게 만들어야

## 변수 더 깔끔하게 정리
    SIDE_QUEST_1: id status dict array -> { id1: status1, id2: status2, ... }

## 로딩 최적화
    loader 써서 미리 fetch하자.

    할 것: suspense 이용해서 체크박스만 있는 곳을 checkboxMany라고 한 다음에 lazy import, suspence하면 스켈레톤 쓸 수 있다

## 프로그레스 바

## 진도표에서 선생은 칸반 보드로 드래그 드롭 할 수 있게


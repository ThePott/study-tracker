# ███████ ███████ 
# ██      ██      
# █████   █████   
# ██      ██      
# ██      ███████ 

# ==== 버그 ====
오답 체크
    체크박스가 안 뜰 때가 있음 ---- 재현이 잘 안 되네


# ==== 질문 ====
1. 칸반 열에서의 순서를 어떻게 데이터베이스에 저장할 수 있을까요?
    떠올려 본 방법
        (적어야)
2. dnd kit에서 useSortable 기능을 사용하면 모두가 한 컨텍스트를 구독해서 하나만 상태 변경이 되어도 모두 업데이트가 된다
    드래그 앤 드롭을 사용할 땐 감수해야 하는 부분?


# ==== 한 것 ====
1. dnd kit -> 칸반 이용해서 상태 바꾸기
    - checkbox 상태 변환 감지할 때 로직과 비교 설명
2. 상태 변경 후 2초 딜레이 디바운스 -> 저장 요청
    - 요청 보내는 즉시 editedDict --(merge)--> initialDict
3. 클릭하면 완료 상태 변경


# ==== 할 것 ====
1. 완료 상태 저장
2. progress 레이아웃 변경 (2열) / header fix
3. summary에 필터된 것만 보여주기
4. 프론트, 백 interface에 in class completed 추가하되, db에 저장된 자료는 유지하기
5. 클릭 해서 in class completed change
    아니야 어떻게 해야 할까.....
    in class completed: 이걸 만들어서 보여줌 










!!!! 완전 잘못했다! 칸반은 요약 페이지에서 하는 거나 진도표 페이지가 아니라! 

상황을 이렇게 정리하자
1. 진도표 페이지에는 클릭할 때마다 completed 바꿀 수 있음
    바꿀 때마다 테두리 달라짐
        완: 검정, 진행중: 파랑, 아직: 흰색
2. completed 바뀌는 것도 동일하게 서버에 보내야 함

3. 요약 페이지에는 completed: in progress만 추출해서 보여줌 : 모든 문제집 섞어서

4. 학생 요약 페이지에서도 동일하게 보여지게 하기



5. 로딩 동일한 인디케이터 쓰기 ---- 스토어를 하나로 합쳐야겠는데?

7. 문제집 별 분류



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


# 편의점 프로그램

## 🎯 구현할 기능 목록

### 1. 파일 입출력

1.1. products.md 파일에서 상품 정보 읽어오기

- 상품명, 가격, 수량, 프로모션 정보 파싱
  1.2. promotions.md 파일에서 프로모션 정보 읽어오기
- 프로모션명, 구매 수량, 증정 수량, 시작일, 종료일 파싱

### 2. 상품 목록 출력

2.1. 초기 화면에 상품 목록 출력

- 상품명, 가격, 수량, 프로모션 정보 포함
- 재고가 0개인 경우 "재고 없음" 표시

### 3. 상품 구매 입력 처리

3.1. 구매할 상품과 수량 입력 받기

- [상품명-수량] 형식 파싱
- 여러 상품 동시 입력 처리 ([상품1-수량],[상품2-수량])
  3.2. 입력값 유효성 검사
- 올바른 형식인지 확인
- 존재하는 상품인지 확인
- 재고 수량 초과 여부 확인

### 4. 프로모션 처리

4.1. 프로모션 적용 가능 여부 확인

- 현재 날짜가 프로모션 기간에 해당하는지 확인
- 프로모션 재고 확인
  4.2. 프로모션 추가 구매 안내
- 프로모션 적용 가능한 수량까지 추가 구매 제안
  4.3. 프로모션 재고 부족 시 처리
- 일반 재고로 구매 여부 확인

### 5. 멤버십 할인 처리

5.1. 멤버십 할인 적용 여부 확인
5.2. 할인액 계산

- 프로모션 미적용 금액의 30% 할인
- 최대 8,000원 한도 적용

### 6. 결제 금액 계산

6.1. 총구매액 계산
6.2. 프로모션 할인액 계산
6.3. 멤버십 할인액 계산
6.4. 최종 결제 금액 계산

### 7. 영수증 출력

7.1. 구매 상품 내역 출력
7.2. 증정 상품 내역 출력
7.3. 금액 정보 출력

- 총구매액
- 행사할인
- 멤버십할인
- 최종 결제 금액

### 8. 재고 관리

8.1. 구매 완료 시 재고 차감

- 일반 재고 차감
- 프로모션 재고 차감

### 9. 추가 구매 처리

9.1. 추가 구매 여부 확인
9.2. 추가 구매 시 업데이트된 재고로 프로세스 반복

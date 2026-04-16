# 미결 질문 — executor UI 스크린샷 필수화

**작성일:** 2026-04-16

- [완료] E2E_Rule 자체를 완화할 것인가 → 사용자 지시: E2E는 만들지 않더라도 스크린샷은 필수. E2E_Rule 자체는 유지하되, 스크린샷은 E2E 유무와 독립적으로 강제한다.
- [완료] 스크린샷 저장 경로를 어디로 할 것인가 → verifier.md의 기존 경로 `{worktreePath}/execution/screenshots/{feature-name}.png`와 통일한다.
- [완료] verifier.md도 수정이 필요한가 → 사용자 지시: verifier.md의 E2E_Screenshot 섹션에서 직접 캡처 로직을 제거하고, executor가 저장한 스크린샷의 존재 여부 검증으로 역할을 재정의한다. 섹션명도 Screenshot_Verification으로 변경.

상태 규칙:
- [미결]: 아직 답 없음
- [완료]: 답변 확정됨
- [제외]: 이번 작업 범위 밖으로 결정

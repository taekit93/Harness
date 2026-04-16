# 기능 리스트 — executor UI 스크린샷 필수화

**작성일:** 2026-04-16

| 기능 | 우선순위 | 설명 | 완료 |
|------|---------|------|------|
| UI_Screenshot 섹션 추가 | P0 | executor.md에 UI 작업 시 스크린샷 필수 캡처 규칙을 새 섹션으로 추가 | [x] |
| 스크린샷 저장 경로 규칙 | P0 | `{worktreePath}/execution/screenshots/{feature-name}.png` 경로로 저장하도록 명시 | [x] |
| E2E 미존재 시 대체 캡처 방법 | P0 | E2E 프레임워크 없어도 Playwright 스크립트 또는 puppeteer로 캡처하는 가이드라인 | [x] |
| execution/log.md 스크린샷 기록 | P0 | 캡처 완료 후 log.md에 스크린샷 경로 목록을 기록하도록 명시 | [x] |
| verifier Screenshot_Verification 재정의 | P0 | verifier.md의 E2E_Screenshot을 직접 캡처 제거 + 존재 검증 전용으로 재정의 | [x] |
| E2E_Rule과의 정합성 조정 | P1 | 기존 E2E_Rule에서 스크린샷 관련 부분과 새 UI_Screenshot 섹션의 역할 분리를 명확히 함 | [x] |

P0: 반드시 구현 / P1: 중요 / P2: 선택

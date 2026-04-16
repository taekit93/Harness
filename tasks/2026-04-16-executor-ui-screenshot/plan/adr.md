# ADR — executor UI 스크린샷 필수화

**작성일:** 2026-04-16
**작성자:** planner (초안) / reviewer (검토 후 보완)

## 결정 1: 스크린샷을 executor 책임으로 지정

**상태:** 확정

**맥락**
현재 스크린샷 검증은 verifier.md의 E2E_Screenshot 섹션에만 존재하며, E2E 테스트 통과 후에 실행되는 절차이다. 그러나 executor가 E2E 테스트를 만들지 않으면 스크린샷도 자연스럽게 누락된다. UI 작업의 시각적 증거를 확보하려면 스크린샷 캡처 자체를 executor의 필수 책임으로 지정해야 한다.

**결정**
executor.md에 `<UI_Screenshot>` 섹션을 추가하여, UI 작업 완료 시 E2E 테스트 존재 여부와 무관하게 스크린샷을 반드시 캡처하도록 한다.

**고려한 대안**
- 대안 A: verifier에서만 스크린샷 강제 — 거부 이유: executor가 E2E를 안 만들면 verifier도 스크린샷을 못 찍음
- 대안 B: designer에게 스크린샷 캡처 위임 — 거부 이유: designer는 구현 전 설계 단계 에이전트로, 구현 결과 캡처에 부적합

**결과**
executor는 UI 작업 시 스크린샷 캡처가 필수 완료 조건이 된다. verifier는 기존대로 스크린샷 존재 여부를 검증한다.

## 결정 2: E2E 프레임워크 미존재 시 Playwright 단독 스크립트로 캡처

**상태:** 확정

**맥락**
E2E 프레임워크(Playwright config, Cypress config)가 없는 프로젝트에서도 스크린샷을 캡처할 수 있어야 한다.

**결정**
E2E 프레임워크가 감지되지 않을 때, 독립 Playwright 스크립트(`npx playwright screenshot`)를 사용하여 캡처한다. Playwright가 설치되지 않은 환경에서는 브라우저 devtools 프로토콜(puppeteer 등)을 대안으로 사용한다. 어떤 방법으로도 불가능한 경우에만 수동 지침과 함께 생략을 허용하되, 반드시 사유를 log.md에 기록한다.

**고려한 대안**
- 대안 A: 항상 수동 스크린샷 지침만 남김 — 거부 이유: 자동화 가능한 경우에도 수동에 의존하게 됨
- 대안 B: 스크린샷 아예 생략 허용 — 거부 이유: 문제의 원점으로 회귀

**결과**
대부분의 환경에서 자동 캡처가 가능하며, 불가능한 극소수 케이스만 사유와 함께 생략된다.

## 결정 3: 스크린샷 저장 경로를 verifier의 기존 규칙과 통일

**상태:** 확정

**맥락**
verifier.md의 E2E_Screenshot 섹션에서 이미 `{worktreePath}/execution/screenshots/{feature-name}.png`를 저장 경로로 정의하고 있다.

**결정**
executor도 동일한 경로 규칙을 사용한다. 이렇게 하면 verifier가 기존 검증 로직을 변경 없이 그대로 사용할 수 있다.

**고려한 대안**
- 대안 A: executor 전용 경로 (예: execution/executor-screenshots/) — 거부 이유: verifier 검증 로직과 경로 불일치 발생

**결과**
executor와 verifier가 동일한 스크린샷 경로를 공유하여 파이프라인 정합성이 유지된다.

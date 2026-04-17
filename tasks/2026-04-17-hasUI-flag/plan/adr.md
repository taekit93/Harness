# ADR — hasUI 플래그 도입 및 스크린샷 자동화

**작성일:** 2026-04-17
**작성자:** planner (초안) / reviewer (검토 후 보완)

## 결정 1: hasUI를 includeDesign과 독립된 별도 플래그로 도입

**상태:** 제안

**맥락**
현재 executor는 UI 포함 여부를 LLM 암묵 추론에 의존한다. `includeDesign` 플래그는 designer 에이전트 삽입 여부를 결정하는 용도로, UI 스크린샷 캡처와는 목적이 다르다. 예를 들어 기존 UI의 버그 수정은 designer가 불필요하지만 스크린샷은 필요한 경우가 있다.

**결정**
`hasUI`를 `includeDesign`과 독립된 별도 불리언 플래그로 pipeline.json에 추가한다.
- `includeDesign`: designer 에이전트 단계 삽입 여부 (UI 설계가 필요한 경우)
- `hasUI`: executor의 스크린샷 캡처 여부 (UI 변경이 포함된 경우)

**고려한 대안**
- 대안 A: includeDesign을 재사용하여 스크린샷 조건으로도 사용 — 거부. 목적이 다르다. 기존 UI 수정 시 designer는 불필요하지만 스크린샷은 필요하다.
- 대안 B: executor가 자체 판단 — 거부. 일관성 없는 결과를 초래하며, planner 단계에서 확정하는 것이 파이프라인 설계 원칙에 부합한다.

**결과**
planner가 작업 분류 시 두 플래그를 독립적으로 설정하여, designer 삽입과 스크린샷 캡처를 개별 제어할 수 있다.

## 결정 2: planner가 hasUI 판별 기준을 규칙 기반으로 문서화

**상태:** 제안

**맥락**
hasUI의 true/false 결정을 planner에게 위임하되, 판별 기준이 모호하면 결과가 일관적이지 않을 수 있다.

**결정**
planner.md에 명시적 판별 규칙을 문서화한다:
- 화면/UI 컴포넌트 추가 또는 수정 → true
- CSS/스타일 변경 → true
- 시각적 버그 수정 → true
- 백엔드 전용, 설정 파일, 문서 전용 → false

**고려한 대안**
- 대안 A: keyword-detector 훅에 UI 키워드 감지 추가 — 거부. 키워드 기반은 맥락을 놓칠 수 있으며, planner의 종합 판단이 더 정확하다. 이번 범위 밖으로 남겨둔다.

**결과**
planner의 판단에 명확한 가이드라인을 제공하여 일관된 hasUI 설정이 가능하다.

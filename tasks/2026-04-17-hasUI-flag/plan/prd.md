# PRD — hasUI 플래그 도입 및 스크린샷 자동화

**작성일:** 2026-04-17
**작성자:** planner
**상태:** 초안

## 목적
기능추가, 수정, 버그픽스 작업에서 UI 관련 여부를 명시적으로 판별하여 `pipeline.json`의 `hasUI` 플래그로 기록하고, executor가 이 플래그를 기반으로 작업 완료 후 주요 화면 또는 버그픽스된 기능의 스크린샷을 자동으로 캡처하도록 한다.

현재 executor는 UI 판단을 LLM 암묵 추론에 의존하고 있어, UI가 포함된 작업임에도 스크린샷이 누락되거나 UI가 아닌 작업에서 불필요한 캡처를 시도하는 문제가 있다. `hasUI` 플래그를 통해 이 판단을 planner 단계에서 확정하여 일관성을 보장한다.

## 대상 사용자
KHT Harness 시스템을 사용하는 개발자 및 에이전트 시스템.

## 핵심 요구사항

### 기능 요구사항
1. planner.md의 Pipeline_State 섹션에 `hasUI` 플래그 설정 규칙을 추가한다
2. planner가 작업 분류 시 UI 관련 여부를 판단하여 `hasUI: true/false`를 pipeline.json에 기록한다
3. executor.md의 UI_Screenshot 섹션이 `hasUI` 플래그를 명시적으로 참조하도록 변경한다
4. executor는 작업 완료 후 `hasUI === true`이면 스크린샷을 캡처하고, `false`이면 생략한다

### 비기능 요구사항
- 기존 `includeDesign` 플래그와 독립적으로 동작한다 (UI 스크린샷과 디자인 단계는 별개)
- 기존 executor의 UI_Screenshot 캡처 방법(Playwright/Puppeteer)은 그대로 유지한다

## 범위

### In Scope
- planner.md에 `hasUI` 플래그 설정 규칙 추가
- executor.md에 `hasUI` 기반 스크린샷 조건 분기 추가
- pipeline.json 스키마에 `hasUI` 필드 추가

### Out of Scope
- keyword-detector 훅 수정 (UI 키워드 자동 감지는 이번 범위 밖)
- designer 에이전트 연동 변경
- 스크린샷 캡처 방법 자체의 변경 (기존 Playwright/Puppeteer 방식 유지)

## 성공 기준
1. planner.md에 `hasUI` 설정 규칙이 문서화되어 있다
2. executor.md의 UI_Screenshot 섹션이 `hasUI` 플래그를 조건으로 사용한다
3. pipeline.json에 `hasUI` 필드가 포함되어 있다
4. `hasUI: false`인 작업에서 executor가 스크린샷 캡처를 수행하지 않는다
5. `hasUI: true`인 작업에서 executor가 주요 기능/버그픽스 화면의 스크린샷을 캡처한다

# PRD — executor UI 스크린샷 필수화

**작성일:** 2026-04-16
**작성자:** planner
**상태:** 확정

## 목적
executor 에이전트가 UI 작업을 수행했을 때, E2E 테스트 프레임워크 유무와 관계없이 주요 기능(P0)에 대한 스크린샷을 반드시 남기도록 강제한다. 현재 E2E 테스트 생성이 누락되는 경향이 있어, 최소한 시각적 증거(스크린샷)라도 확보하여 UI 구현 품질을 검증 가능하게 한다.

## 대상 사용자
- executor 에이전트 (직접 스크린샷 캡처 수행)
- verifier 에이전트 (스크린샷 존재 여부 검증)
- planner/reviewer (스크린샷으로 결과 확인)

## 핵심 요구사항
- (기능) executor가 UI 작업 완료 후 features.md P0 항목별 스크린샷을 캡처하여 저장
- (기능) E2E 테스트 프레임워크가 없더라도 대체 수단(Playwright 스크립트 등)으로 스크린샷 캡처
- (기능) execution/log.md에 스크린샷 경로 목록 기록
- (비기능) 기존 E2E_Rule과 충돌하지 않는 구조

## 범위
### In Scope
- `.claude/agents/executor.md`에 UI_Screenshot 섹션 추가
- `.claude/agents/verifier.md`의 E2E_Screenshot 섹션을 Screenshot_Verification으로 재정의 (직접 캡처 제거, 존재 검증만 담당)
- 스크린샷 저장 경로 규칙 정의
- 캡처 방법 가이드라인 (Playwright, puppeteer 등)
- execution/log.md 기록 형식 정의

### Out of Scope
- E2E_Rule 자체의 삭제 또는 완화 (기존 규칙 유지)
- 스크린샷 자동 비교(visual regression) 도구 도입

## 성공 기준
- executor.md에 UI_Screenshot 섹션이 추가되어 있다
- UI 작업 시 E2E 테스트 유무와 관계없이 스크린샷을 반드시 남기도록 명시되어 있다
- 스크린샷 저장 경로, 캡처 방법, 로그 기록 형식이 정의되어 있다
- verifier.md의 E2E_Screenshot이 Screenshot_Verification으로 재정의되어 검증만 담당한다
- verifier는 스크린샷을 직접 캡처하지 않고, executor가 저장한 파일의 존재 여부만 검증한다
- 기존 E2E_Rule과 정합성이 맞다

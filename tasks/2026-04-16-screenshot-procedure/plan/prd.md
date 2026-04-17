# PRD — executor UI 스크린샷 자동 캡처 절차 구체화

**작성일:** 2026-04-16
**작성자:** planner
**상태:** 초안

## 목적
executor 에이전트가 UI 스크린샷을 실제로 캡처할 수 있도록 executor.md의 UI_Screenshot 섹션에 구체적인 실행 절차를 추가한다. 현재는 캡처 방법만 나열되어 있고, Playwright 설치 확인/설치, dev 서버 구동/종료 절차가 없어서 executor가 실제 실행에 실패한다.

## 대상 사용자
executor 에이전트 (executor.md의 지시를 따라 동작하는 Claude Sonnet)

## 핵심 요구사항
- **기능 요구사항:**
  1. Playwright 설치 여부 확인 절차 추가
  2. 미설치 시 자동 설치 절차 추가
  3. Dev 서버 자동 감지 및 구동 절차 추가
  4. 서버 ready 확인 후 스크린샷 캡처 절차 명시
  5. 캡처 완료 후 dev 서버 종료 절차 추가
- **비기능 요구사항:**
  - 기존 executor.md의 다른 섹션에 영향 없음 (최소 diff)
  - 절차가 프로젝트 프레임워크에 독립적이어야 함 (Next.js, Vite, CRA 등 모두 대응)

## 범위
### In Scope
- executor.md의 `<UI_Screenshot>` 섹션 내 "캡처 방법" 부분을 구체적인 단계별 절차로 교체
- Playwright 설치 확인/설치 단계
- dev 서버 감지/구동/종료 단계
- 서버 ready 대기 로직

### Out of Scope
- Puppeteer 지원 (Playwright로 통일)
- E2E 테스트 절차 변경
- designer 에이전트 관련 변경
- 새로운 스크립트 파일 생성

## 성공 기준
- executor.md의 UI_Screenshot 섹션이 5단계 절차(확인 -> 설치 -> 서버 구동 -> 캡처 -> 서버 종료)를 포함
- 각 단계에 실행할 정확한 bash 명령어가 명시됨
- 기존 섹션의 캡처 시점, 대상, 저장 경로, 캡처 후 규칙은 유지됨

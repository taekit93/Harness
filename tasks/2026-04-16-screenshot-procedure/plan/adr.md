# ADR — executor UI 스크린샷 자동 캡처 절차 구체화

**작성일:** 2026-04-16
**작성자:** planner (초안)

## 결정 1: Playwright 단일 도구로 통일

**상태:** 제안

**맥락**
기존 executor.md에는 캡처 도구로 Playwright, Puppeteer, 수동 캡처 3가지가 우선순위로 나열되어 있었다. 그러나 다수의 도구를 지원하면 절차가 복잡해지고, executor가 각 도구별 분기 로직을 실행해야 한다.

**결정**
Playwright만 사용한다. Puppeteer 옵션을 제거하고 Playwright 설치/실행 절차를 구체화한다.

**고려한 대안**
- Puppeteer 병행 지원 — 절차 복잡도 증가, 두 도구 모두 설치/관리해야 함. 거부.
- 수동 캡처 안내 유지 — 자동화 목적에 맞지 않음. 거부.

**결과**
- executor.md의 캡처 방법이 단순해짐
- Playwright 미설치 환경에서 자동 설치 절차가 필요 (features.md에 반영)

## 결정 2: Dev 서버 감지는 package.json scripts 기반

**상태:** 제안

**맥락**
스크린샷 캡처를 위해 dev 서버가 실행 중이어야 한다. 프로젝트마다 dev 서버 실행 방법이 다르다 (Next.js: `next dev`, Vite: `vite`, CRA: `react-scripts start` 등).

**결정**
package.json의 `scripts` 필드에서 `dev` > `start` 순으로 스크립트를 감지하여 `npm run dev` 또는 `npm run start`를 실행한다.

**고려한 대안**
- 프레임워크별 명시적 분기 — 유지보수 비용 높음, 새 프레임워크 추가 시마다 수정 필요. 거부.
- 사용자에게 dev 서버 명령을 묻기 — 자동화 흐름이 끊김. 거부.

**결과**
- 대부분의 프로젝트에서 자동 감지 가능
- package.json에 dev/start 스크립트가 없는 경우 log.md에 기록하고 스크린샷 생략

## 결정 3: 서버 ready 대기는 curl 폴링 방식

**상태:** 제안

**맥락**
dev 서버 구동 후 실제로 요청을 받을 수 있을 때까지 시간이 걸린다. ready 확인 없이 바로 캡처하면 실패한다.

**결정**
curl을 사용한 폴링 방식으로 서버 ready를 확인한다. `wait-on` 같은 외부 패키지 설치 없이, bash 루프로 구현한다.

**고려한 대안**
- `npx wait-on` 사용 — 추가 패키지 설치가 필요, 네트워크 환경에 따라 설치 실패 가능. 거부.
- 고정 sleep — 프로젝트마다 서버 시작 시간이 달라 안정적이지 않음. 거부.

**결과**
- 외부 의존성 없이 서버 ready 확인 가능
- 타임아웃 설정으로 무한 대기 방지

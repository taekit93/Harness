# 기능 리스트 — executor UI 스크린샷 자동 캡처 절차 구체화

**작성일:** 2026-04-16

| 기능 | 우선순위 | 설명 | 완료 |
|------|---------|------|------|
| Playwright 설치 확인 | P0 | `npx playwright --version` 실행하여 설치 여부 판별. 실패 시 미설치로 판단 | [ ] |
| Playwright 자동 설치 | P0 | 미설치 시 `npm install --save-dev playwright` + `npx playwright install chromium` 실행 | [ ] |
| Dev 서버 자동 감지/구동 | P0 | package.json의 scripts에서 dev/start 스크립트 감지. 백그라운드로 서버 구동 | [ ] |
| 서버 ready 대기 | P0 | 서버가 응답할 때까지 대기 (npx wait-on 또는 curl 폴링) | [ ] |
| 스크린샷 캡처 실행 | P0 | Playwright로 지정 URL 접속 후 full-page 스크린샷 저장 | [ ] |
| Dev 서버 종료 | P0 | 캡처 완료 후 백그라운드 서버 프로세스 종료 | [ ] |

P0: 반드시 구현 / P1: 중요 / P2: 선택

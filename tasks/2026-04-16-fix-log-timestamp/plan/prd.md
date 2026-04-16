# PRD — fix-log-timestamp

**작성일:** 2026-04-16
**작성자:** planner
**상태:** 초안

## 목적
execution/log.md에 기록되는 시간({HH:MM})이 시스템 프롬프트의 `currentDate` 값(날짜만 포함, 시간 없음)을 UTC 자정으로 해석한 뒤 KST 변환하여 항상 09:00으로 찍히는 버그를 수정한다. 에이전트들이 log.md에 시간을 기록할 때 `date` bash 명령으로 실제 시스템 시간을 가져오도록 지시를 추가한다.

## 대상 사용자
KHT Harness 에이전트 파이프라인을 사용하는 개발자.

## 핵심 요구사항
- 기능 요구사항: 모든 에이전트가 log.md에 시간을 기록할 때 `date +%H:%M` bash 명령으로 실제 시스템 시간을 획득하도록 명시적 지시 추가
- 비기능 요구사항: 기존 에이전트 동작에 부작용 없음, 문서 형식(FORMATS.md) 정합성 유지

## 범위
### In Scope
- `.claude/agents/planner.md` — log.md 시간 기록 시 실제 시스템 시간 사용 지시 추가
- `.claude/agents/executor.md` — 동일 지시 추가
- `.claude/agents/designer.md` — 동일 지시 추가
- `.claude/agents/verifier.md` — 동일 지시 추가
- `.claude/agents/reviewer.md` — 동일 지시 추가
- `.claude/agents/git-master.md` — 동일 지시 추가
- `docs/FORMATS.md` — log.md 형식에 시간 획득 방법 명시

### Out of Scope
- execution/decisions.md, execution/issues.md 등 다른 문서의 시간 기록
- 에이전트 로직 변경 (시간 획득 지시 추가만 수행)

## 성공 기준
- 모든 에이전트 .md 파일에 log.md 시간 기록 시 `date +%H:%M` 사용 지시가 포함되어 있다
- docs/FORMATS.md의 log.md 형식에 시간 획득 방법이 명시되어 있다
- 기존 에이전트 동작에 영향을 주는 변경이 없다

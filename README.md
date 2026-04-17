# KHT Harness

Claude Code 프로젝트에 복사해서 붙여 넣어 사용할 수 있는 훅 기반 멀티 에이전트 오케스트레이션 세트입니다.
모든 요청을 기본적으로 `planner`부터 시작하게 만들고, 작업 문서와 단계별 에이전트로 실행 흐름을 고정합니다.

## 빠르게 적용하기

### 요구사항

- Claude Code
- Node.js 18+

### 1. 아래 파일과 폴더를 대상 프로젝트 루트에 복사하세요

- `CLAUDE.md`
- `.claude/agents/`
- `.claude/settings.json`
- `hooks/`
- `skills/`
- `docs/`

### 2. Claude Code를 재시작하세요

`.claude/settings.json`에 등록된 훅은 Claude Code를 다시 열어야 반영됩니다.

### 3. 재시작 이후 원하는 작업을 시작하세요

이제는 별도 키워드 없이 그냥 원하는 요청을 보내면 됩니다.

예시:

- `로그 포맷을 정리해줘`
- `UI 작업 흐름을 설명해줘`
- `이 기능 구현 계획을 잡아줘`

이 설정에서는 모든 요청이 기본적으로 `planner`부터 시작합니다.
질문성 요청이면 `planner`가 직접 답하고, 작업성 요청이면 `tasks/` 문서를 만들고 파이프라인을 진행합니다.

### 4. 키워드는 필요할 때만 쓰세요

키워드는 필수가 아니라, 특정 흐름을 명시하고 싶을 때 쓰는 선택 기능입니다.

- `plan:` / `계획:`: planning 의도를 명시
- `design:` / `디자인:`: designer 호출 의도를 명시
- `execute:` / `구현:`: executor 호출 의도를 명시
- `review:` / `리뷰:`: reviewer 호출 의도를 명시
- `verify:` / `검증:`: verifier 호출 의도를 명시
- `commit:` / `커밋:`: git-master 호출 의도를 명시
- `autopilot:`: 전체 파이프라인 자동 실행
- `brainstorm`, `debug`, `tdd`: 스킬 로딩 유도

## 복사한 파일이 하는 일

| 경로 | 역할 |
|------|------|
| `CLAUDE.md` | 오케스트레이션 규칙, 에이전트 카탈로그, 파이프라인 원칙 정의 |
| `.claude/agents/` | `planner`, `executor`, `reviewer` 같은 전문 에이전트 정의 |
| `.claude/settings.json` | Claude Code 권한과 훅 등록 |
| `hooks/` | 키워드 감지, 중간 종료 차단, 컨텍스트 저장 자동화 |
| `skills/` | brainstorming, writing-plans, verification 같은 작업 스킬 |
| `docs/` | 시작 가이드, 아키텍처, 에이전트 설명, 문서 형식 표준 |

## 동작 방식 한눈에 보기

기본 실행 흐름은 아래와 같습니다.

`사용자 요청`
→ `keyword-detector` 훅
→ `planner` 진입
→ 작업성 판단
→ 필요한 에이전트 실행
→ `persistent-mode` 훅으로 미완료 종료 차단
→ `state-saver` 훅으로 컨텍스트 저장

파이프라인은 두 가지입니다.

- 일반 개발: `Plan → Execute → Review → Verify → Commit`
- UI 포함 작업: `Plan → Design → Execute → Review → Verify → Commit`

## 에이전트 요약

| 에이전트 | 역할 |
|---------|------|
| `planner` | 요구사항 분석, 작업성 판단, `tasks/` 문서 생성 |
| `designer` | UI/UX 설계와 퍼블리싱 보조 |
| `executor` | 실제 코드 구현 |
| `reviewer` | 코드 품질과 보안 리뷰 |
| `verifier` | 빌드, 테스트, 린트 검증과 증거 수집 |
| `git-master` | Conventional Commits 기반 커밋 정리 |

## 훅 요약

| 훅 | 이벤트 | 역할 |
|----|--------|------|
| `keyword-detector.mjs` | `UserPromptSubmit` | 키워드 감지, 기본 planner 진입 메시지 주입 |
| `persistent-mode.mjs` | `Stop` | 검증 전 종료 차단 |
| `state-saver.mjs` | `PreCompact` | 컨텍스트 압축 전 상태 저장 |

## 작업 결과물 위치

작업성 요청은 보통 아래 구조를 사용합니다.

```text
tasks/
  {yyyy-MM-dd}-{작업명}/
    plan/
    execution/
```

런타임 상태는 `.harness/pipeline.json`에 기록되고, 압축 대비 메모는 `.harness/notepad.md`에 저장됩니다.

## 더 자세한 문서

- [Getting Started](docs/GETTING-STARTED.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Agents](docs/AGENTS.md)
- [Document Formats](docs/FORMATS.md)

// hooks/persistent-mode.mjs
import { readFileSync, existsSync } from 'node:fs';

export function countPendingQuestions(taskPath) {
  if (!taskPath) return 0;
  const oqPath = `${taskPath}/plan/open-questions.md`;
  if (!existsSync(oqPath)) return 0;
  const content = readFileSync(oqPath, 'utf8');
  return (content.match(/\[미결\]/g) || []).length;
}

export function shouldBlock(pipeline, pendingCount = 0) {
  if (!pipeline) return { block: false };
  if (!pipeline.active) return { block: false };
  if (pipeline.verified) return { block: false };

  // plan 단계: [미결] 항목이 있으면 차단
  if (pipeline.stage === 'plan' && pendingCount > 0) {
    return {
      block: true,
      reason: `계획 단계에서 미결 항목 ${pendingCount}개가 남아있습니다. open-questions.md의 모든 [미결] 항목을 해결한 후 진행하세요.`,
    };
  }

  return {
    block: true,
    reason: `파이프라인이 완료되지 않았습니다. 현재 단계: ${pipeline.stage}. verifier로 검증을 완료한 후 종료하세요.`,
  };
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('persistent-mode.mjs') ||
  process.argv[1].replace(/\\/g, '/').endsWith('persistent-mode.mjs')
);

if (isMain) {
  const pipelinePath = '.harness/pipeline.json';
  if (!existsSync(pipelinePath)) process.exit(0);

  let pipeline = null;
  try {
    pipeline = JSON.parse(readFileSync(pipelinePath, 'utf8'));
  } catch {
    process.exit(0);
  }

  const pendingCount = countPendingQuestions(pipeline.taskPath);
  const result = shouldBlock(pipeline, pendingCount);
  if (result.block) {
    process.stdout.write(JSON.stringify({ decision: 'block', reason: result.reason }));
  }
}

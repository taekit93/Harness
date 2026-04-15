// hooks/persistent-mode.mjs
import { readFileSync, existsSync } from 'node:fs';

export function shouldBlock(pipeline) {
  if (!pipeline) return { block: false };
  if (!pipeline.active) return { block: false };
  if (pipeline.verified) return { block: false };
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

  const result = shouldBlock(pipeline);
  if (result.block) {
    process.stdout.write(JSON.stringify({ decision: 'block', reason: result.reason }));
  }
}

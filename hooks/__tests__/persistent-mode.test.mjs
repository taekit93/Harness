// hooks/__tests__/persistent-mode.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldBlock } from '../persistent-mode.mjs';

test('active + 미검증 → blockStop', () => {
  const pipeline = { active: true, stage: 'execute', verified: false };
  const result = shouldBlock(pipeline, 0);
  assert.equal(result.block, true);
  assert.ok(result.reason.includes('execute'));
});

test('active + 검증완료 → 허용', () => {
  const pipeline = { active: true, stage: 'verify', verified: true };
  const result = shouldBlock(pipeline, 0);
  assert.equal(result.block, false);
});

test('비활성 → 허용', () => {
  const pipeline = { active: false, stage: 'done', verified: false };
  const result = shouldBlock(pipeline, 0);
  assert.equal(result.block, false);
});

test('pipeline null → 허용', () => {
  const result = shouldBlock(null, 0);
  assert.equal(result.block, false);
});

test('plan 단계 + 미결 항목 있음 → blockStop', () => {
  const pipeline = { active: true, stage: 'plan', verified: false };
  const result = shouldBlock(pipeline, 2);
  assert.equal(result.block, true);
  assert.ok(result.reason.includes('미결 항목 2개'));
});

test('plan 단계 + 미결 항목 없음 → 허용 안 함 (파이프라인 미완료)', () => {
  const pipeline = { active: true, stage: 'plan', verified: false };
  const result = shouldBlock(pipeline, 0);
  assert.equal(result.block, true);
  assert.ok(result.reason.includes('plan'));
});

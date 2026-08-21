import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateReleaseReadiness,
  REQUIRED_RELEASE_FILES,
} from "../scripts/release-readiness.mjs";

const readyState = {
  nodeVersion: "v22.23.0",
  headSha: "a".repeat(40),
  remoteUrl: "https://github.com/example/toolpilot.git",
  statusPorcelain: "",
  trackedFiles: new Set(REQUIRED_RELEASE_FILES),
};

test("release readiness accepts an immutable clean GitHub checkout", () => {
  assert.deepEqual(evaluateReleaseReadiness(readyState), []);
});

test("release readiness accepts the standard GitHub SSH remote", () => {
  assert.deepEqual(
    evaluateReleaseReadiness({
      ...readyState,
      remoteUrl: "git@github.com:example/toolpilot.git",
    }),
    [],
  );
});

test("release readiness rejects a missing remote and dirty worktree", () => {
  const failures = evaluateReleaseReadiness({
    ...readyState,
    remoteUrl: "",
    statusPorcelain: " M TASK.md\n?? scripts/release-readiness.mjs",
  });

  assert.deepEqual(failures, [
    "GitHub origin is missing; add the repository remote before release.",
    "Worktree is not clean (2 changed or untracked paths).",
  ]);
});

test("release readiness rejects an unsafe remote, short SHA, and missing files", () => {
  const failures = evaluateReleaseReadiness({
    ...readyState,
    nodeVersion: "v20.17.0",
    headSha: "f65b5a7",
    remoteUrl: "https://token@github.com/example/toolpilot.git",
    trackedFiles: new Set(),
  });

  assert.equal(failures.length, 4);
  assert.match(failures[0], /Node\.js 22/);
  assert.match(failures[1], /40-character/);
  assert.match(failures[2], /credential-free GitHub/);
  assert.match(failures[3], /Required release files are not tracked/);
});

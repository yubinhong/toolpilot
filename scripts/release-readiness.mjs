import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const REQUIRED_RELEASE_FILES = Object.freeze([
  ".github/workflows/ci.yml",
  ".github/workflows/pages-release.yml",
  ".github/workflows/production-monitor.yml",
  ".nvmrc",
  "package-lock.json",
  "package.json",
  "scripts/release-readiness.mjs",
  "scripts/smoke.mjs",
]);

function isGitHubRemote(remoteUrl) {
  if (/^git@github\.com:[^/\s]+\/[^/\s]+(?:\.git)?$/.test(remoteUrl)) {
    return true;
  }

  try {
    const parsed = new URL(remoteUrl);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const validProtocol = parsed.protocol === "https:" || parsed.protocol === "ssh:";
    const validIdentity = parsed.protocol === "https:" ? !parsed.username : parsed.username === "git";

    return (
      validProtocol &&
      parsed.hostname === "github.com" &&
      validIdentity &&
      !parsed.password &&
      pathParts.length === 2
    );
  } catch {
    return false;
  }
}

export function evaluateReleaseReadiness({
  nodeVersion,
  headSha,
  remoteUrl,
  statusPorcelain,
  trackedFiles,
}) {
  const failures = [];

  if (!/^v22\./.test(nodeVersion)) {
    failures.push(`Node.js 22 is required; current runtime is ${nodeVersion}.`);
  }

  if (!/^[0-9a-f]{40}$/.test(headSha)) {
    failures.push("HEAD must resolve to a full 40-character lowercase commit SHA.");
  }

  if (!remoteUrl) {
    failures.push("GitHub origin is missing; add the repository remote before release.");
  } else if (!isGitHubRemote(remoteUrl)) {
    failures.push("origin must be a credential-free GitHub HTTPS or SSH repository URL.");
  }

  const changedPaths = statusPorcelain.trim()
    ? statusPorcelain.trim().split("\n").filter(Boolean).length
    : 0;
  if (changedPaths > 0) {
    failures.push(`Worktree is not clean (${changedPaths} changed or untracked paths).`);
  }

  const missingFiles = REQUIRED_RELEASE_FILES.filter((file) => !trackedFiles.has(file));
  if (missingFiles.length > 0) {
    failures.push(`Required release files are not tracked: ${missingFiles.join(", ")}.`);
  }

  return failures;
}

function gitOutput(args, { allowFailure = false } = {}) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (error) {
    if (allowFailure) {
      return "";
    }
    throw error;
  }
}

function readRepositoryState() {
  const trackedOutput = gitOutput(["ls-files"]);

  return {
    nodeVersion: process.version,
    headSha: gitOutput(["rev-parse", "HEAD"]),
    remoteUrl: gitOutput(["config", "--get", "remote.origin.url"], { allowFailure: true }),
    statusPorcelain: gitOutput(["status", "--porcelain=v1", "--untracked-files=all"]),
    trackedFiles: new Set(trackedOutput ? trackedOutput.split("\n") : []),
  };
}

function run() {
  let failures;

  try {
    failures = evaluateReleaseReadiness(readRepositoryState());
  } catch {
    console.error("Release readiness failed: unable to read the Git repository state.");
    process.exitCode = 1;
    return;
  }

  if (failures.length > 0) {
    console.error("Release readiness failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Release readiness passed: Node 22, immutable HEAD, GitHub origin, clean worktree, and tracked release files.");
}

const entryPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (entryPath === import.meta.url) {
  run();
}

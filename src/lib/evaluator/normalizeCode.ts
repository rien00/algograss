export type NormalizedCode = {
  compact: string;
  lower: string;
  loose: string;
};

export function stripComments(code: string): string {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

export function normalizeCode(code: string): NormalizedCode {
  const withoutComments = stripComments(code);
  const lower = withoutComments.toLowerCase();
  const compact = lower
    .replace(/\.offer\s*\(/g, ".add(")
    .replace(/==\s*true/g, "")
    .replace(/true\s*==/g, "")
    .replace(/([a-zA-Z_$][\w$]*(?:\[[^\]]+\])?)\s*==\s*false/g, "!$1")
    .replace(/false\s*==\s*([a-zA-Z_$][\w$]*(?:\[[^\]]+\])?)/g, "!$1")
    .replace(/[;\s]+/g, "");

  return {
    compact,
    lower,
    loose: lower.replace(/\s+/g, " ").trim(),
  };
}

export type PatternCheck = {
  name: string;
  passed: boolean;
  feedback: string;
  critical?: boolean;
};

export function makeEvaluation(checks: PatternCheck[], successMessage: string) {
  const passedCount = checks.filter((check) => check.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const failedCritical = checks.some((check) => check.critical && !check.passed);
  const missing = checks.filter((check) => !check.passed);

  return {
    passed: score >= 80 && !failedCritical,
    score,
    matchedPatterns: checks.filter((check) => check.passed).map((check) => check.name),
    missingPatterns: missing.map((check) => check.name),
    feedback:
      missing.length === 0
        ? successMessage
        : missing.map((check) => check.feedback).join(" "),
  };
}

export function hasMethodCall(compact: string, methodName: string): boolean {
  return new RegExp(`${methodName}\\s*\\(`).test(compact);
}

export function hasRecursiveIncrementCall(compact: string, methodName: string): boolean {
  return new RegExp(`${methodName}\\((?:[^)]*\\+1|[^)]*1\\+[^)]*)\\)`).test(compact);
}

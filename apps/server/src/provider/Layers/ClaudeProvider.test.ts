import { assert, it } from "@effect/vitest";

import { parseClaudeInitializationSkills } from "./ClaudeProvider.ts";

it("keeps same-named Claude skills from different paths and scopes", () => {
  const skills = parseClaudeInitializationSkills([
    {
      name: "deploy",
      path: "/Users/test/.claude/skills/deploy/SKILL.md",
      scope: "user",
      description: "Personal deployment flow",
    },
    {
      name: "deploy",
      path: "/repo/.claude/skills/deploy/SKILL.md",
      scope: "project",
      description: "Project deployment flow",
    },
  ]);

  assert.deepStrictEqual(
    skills.map((skill) => ({
      name: skill.name,
      path: skill.path,
      scope: skill.scope,
      description: skill.description,
    })),
    [
      {
        name: "deploy",
        path: "/Users/test/.claude/skills/deploy/SKILL.md",
        scope: "user",
        description: "Personal deployment flow",
      },
      {
        name: "deploy",
        path: "/repo/.claude/skills/deploy/SKILL.md",
        scope: "project",
        description: "Project deployment flow",
      },
    ],
  );
});

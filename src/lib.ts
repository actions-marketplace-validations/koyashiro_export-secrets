import * as core from "@actions/core";
import { z } from "zod";

type ActionsCore = typeof core;

const secretsSchema = z.record(z.string(), z.string());

export function exportSecrets(core: ActionsCore) {
  const secretsJson = core.getInput("secrets");

  if (!secretsJson) {
    throw new Error("secrets is required");
  }

  const secrets = secretsSchema.parse(JSON.parse(secretsJson));

  for (const [key, value] of Object.entries(secrets)) {
    core.exportVariable(key, value);
  }
}
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROFILE } from "@/lib/portfolio/data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return Jeet Soni's public profile: name, role, tagline, location, email, and links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROFILE, null, 2) }],
    structuredContent: PROFILE,
  }),
});

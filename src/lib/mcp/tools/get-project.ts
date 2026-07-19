import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROJECTS } from "@/lib/portfolio/data";

export default defineTool({
  name: "get_project",
  title: "Get project detail",
  description: "Return the full detail (problem, approach, outcome, impact, learned, future) for a project by title.",
  inputSchema: {
    title: z.string().min(1).describe("Case-insensitive project title match."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ title }) => {
    const q = title.toLowerCase();
    const project = PROJECTS.find(
      (p) => p.title.toLowerCase() === q || p.title.toLowerCase().includes(q),
    );
    if (!project) {
      return {
        content: [{ type: "text", text: `No project found matching "${title}".` }],
        isError: true,
      };
    }
    const { icon: _icon, ...rest } = project as unknown as Record<string, unknown>;
    return {
      content: [{ type: "text", text: JSON.stringify(rest, null, 2) }],
      structuredContent: rest as Record<string, unknown>,
    };
  },
});

import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROJECTS } from "@/lib/portfolio/data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List Jeet's portfolio projects with summaries, categories, and tags.",
  inputSchema: {
    category: z.string().optional().describe("Optional case-insensitive category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category
      ? PROJECTS.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
      : PROJECTS;
    const summary = items.map((p) => ({
      title: p.title,
      category: p.category,
      summary: p.summary,
      tags: p.tags,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { projects: summary },
    };
  },
});

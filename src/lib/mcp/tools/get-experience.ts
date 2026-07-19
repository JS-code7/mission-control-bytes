import { defineTool } from "@lovable.dev/mcp-js";
import { EXPERIENCES, EDUCATION, CERTIFICATIONS, SKILLS, TIMELINE } from "@/lib/portfolio/data";

export default defineTool({
  name: "get_experience",
  title: "Get experience & credentials",
  description: "Return Jeet's experience, education, certifications, skill groups, and timeline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      experiences: EXPERIENCES,
      education: EDUCATION,
      certifications: CERTIFICATIONS,
      skills: SKILLS,
      timeline: TIMELINE,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});

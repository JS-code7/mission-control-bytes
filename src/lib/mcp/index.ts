import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import getExperienceTool from "./tools/get-experience";
import submitContactTool from "./tools/submit-contact";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "mission-control-mcp",
  title: "Jeet Soni — Mission Control MCP",
  version: "0.1.0",
  instructions:
    "Tools for exploring Jeet Soni's portfolio (Mission Control): profile, projects, experience/skills/certifications/timeline, and a contact endpoint. Use get_profile for identity, list_projects to browse, get_project for a deep dive, get_experience for CV-style data, and submit_contact to send a message.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, listProjectsTool, getProjectTool, getExperienceTool, submitContactTool],
});

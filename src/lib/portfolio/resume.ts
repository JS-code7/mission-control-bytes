import resumeAsset from "@/assets/resume.pdf.asset.json";
import { track } from "./analytics";

export const RESUME_URL = resumeAsset.url;
export const RESUME_FILENAME = "Jeet-Soni-Resume.pdf";

export async function downloadResume(source: string) {
  await track("resume_download", { source });
  // Trigger an actual download via anchor with download attribute.
  const a = document.createElement("a");
  a.href = RESUME_URL;
  a.download = RESUME_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

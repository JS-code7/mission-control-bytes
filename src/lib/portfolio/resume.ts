import { track } from "./analytics";
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const RESUME_FILENAME = "Jeet-Soni-Resume.pdf";
export const RESUME_URL = resumeAsset.url;

/**
 * Download the latest uploaded resume PDF. Fetches the CDN asset,
 * turns it into a Blob, and triggers a real file download that works
 * on both desktop and mobile browsers. Falls back to a same-tab
 * navigation if the Blob path is blocked.
 */
export async function downloadResume(source: string) {
  track("resume_download", { source }).catch(() => {});

  try {
    const res = await fetch(RESUME_URL, { credentials: "omit" });
    if (!res.ok) throw new Error(`resume fetch failed: ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = RESUME_FILENAME;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  } catch {
    // Fallback: open the CDN URL directly so the user still gets the file.
    window.location.href = RESUME_URL;
  }
}

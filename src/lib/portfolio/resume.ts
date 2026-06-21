import { track } from "./analytics";
import {
  PROFILE,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  SKILLS,
  PROJECTS,
  TIMELINE,
} from "./data";

export const RESUME_FILENAME = "Jeet-Soni-Resume.pdf";

// Build a rich, multi-page resume PDF on the fly so it always reflects
// the latest portfolio data — projects, skills, certs, timeline, etc.
export async function downloadResume(source: string) {
  await track("resume_download", { source });

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = M;

  const ACCENT: [number, number, number] = [14, 165, 233];   // cyan
  const ACCENT2: [number, number, number] = [139, 92, 246];  // purple
  const INK: [number, number, number] = [20, 24, 33];
  const SUB: [number, number, number] = [90, 100, 115];
  const RULE: [number, number, number] = [220, 225, 232];

  const ensure = (need: number) => {
    if (y + need > PAGE_H - M) {
      doc.addPage();
      y = M;
    }
  };

  const setFont = (style: "normal" | "bold" | "italic" = "normal", size = 10) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
  };

  const setColor = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);

  const text = (
    t: string,
    x: number,
    yy: number,
    opts: { maxWidth?: number; color?: [number, number, number]; size?: number; style?: "normal" | "bold" | "italic" } = {},
  ) => {
    if (opts.color) setColor(opts.color);
    setFont(opts.style ?? "normal", opts.size ?? 10);
    const lines = doc.splitTextToSize(t, opts.maxWidth ?? PAGE_W - M * 2);
    doc.text(lines, x, yy);
    return lines.length * (opts.size ?? 10) * 1.25;
  };

  const sectionTitle = (label: string) => {
    ensure(40);
    y += 6;
    setColor(ACCENT);
    setFont("bold", 11);
    doc.text(label.toUpperCase(), M, y);
    y += 6;
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.6);
    doc.line(M, y, PAGE_W - M, y);
    y += 14;
  };

  // ===== Header banner =====
  doc.setFillColor(15, 18, 26);
  doc.rect(0, 0, PAGE_W, 120, "F");
  // accent stripe
  doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
  doc.rect(0, 116, PAGE_W * 0.6, 4, "F");
  doc.setFillColor(ACCENT2[0], ACCENT2[1], ACCENT2[2]);
  doc.rect(PAGE_W * 0.6, 116, PAGE_W * 0.4, 4, "F");

  setColor([255, 255, 255]);
  setFont("bold", 24);
  doc.text(PROFILE.name.toUpperCase(), M, 58);
  setFont("normal", 11);
  setColor([180, 200, 220]);
  doc.text(PROFILE.role, M, 78);
  setFont("italic", 9);
  setColor([130, 150, 170]);
  doc.text(PROFILE.tagline, M, 95);

  // contact column
  setFont("normal", 9);
  setColor([200, 215, 230]);
  const right = PAGE_W - M;
  const lines = [
    PROFILE.email,
    `+91 ${PROFILE.phone}`,
    PROFILE.location,
    PROFILE.linkedin.replace("https://", ""),
    PROFILE.github.replace("https://", ""),
  ];
  lines.forEach((l, i) => {
    const w = doc.getTextWidth(l);
    doc.text(l, right - w, 42 + i * 13);
  });

  y = 150;

  // ===== Summary =====
  sectionTitle("Profile");
  setColor(INK);
  y += text(
    "Co-Founder @ BinBuddy — an incubated, funded startup building intelligent, AI-driven systems across software and hardware. Engineer focused on cybersecurity, robotics & electronics, web platforms, AI/ML applications, and Azure cloud. I ship end-to-end: from sensor and circuit to model, API, and product.",
    M, y, { size: 10, color: INK },
  );
  y += 6;

  // ===== Skills =====
  sectionTitle("Core Skills");
  const colW = (PAGE_W - M * 2 - 16) / 2;
  let colX = M;
  let rowY = y;
  SKILLS.forEach((g, i) => {
    if (i % 2 === 0 && i !== 0) {
      y = Math.max(y, rowY) + 6;
      rowY = y;
      colX = M;
    } else if (i % 2 === 1) {
      colX = M + colW + 16;
    } else {
      colX = M;
    }
    ensure(60);
    setFont("bold", 10);
    setColor(ACCENT2);
    doc.text(g.group, colX, rowY);
    setFont("normal", 9);
    setColor(INK);
    const h = text(g.items.join(" · "), colX, rowY + 13, { maxWidth: colW, size: 9 });
    if (i % 2 === 1) y = rowY + 18 + h;
    else y = Math.max(y, rowY + 18 + h);
  });
  y += 10;

  // ===== Experience =====
  sectionTitle("Experience");
  EXPERIENCES.forEach((e) => {
    ensure(60);
    setFont("bold", 11);
    setColor(INK);
    doc.text(e.role, M, y);
    setFont("normal", 9);
    setColor(SUB);
    const period = e.period;
    const pw = doc.getTextWidth(period);
    doc.text(period, PAGE_W - M - pw, y);
    y += 14;
    setFont("italic", 10);
    setColor(ACCENT);
    doc.text(e.company, M, y);
    y += 14;
    setFont("normal", 10);
    setColor(INK);
    y += text(e.summary, M, y, { size: 10 });
    setFont("normal", 8);
    setColor(SUB);
    y += text("Tags: " + e.tags.join(" · "), M, y + 2, { size: 8, color: SUB });
    y += 10;
  });

  // ===== Projects (the big one user asked for) =====
  sectionTitle("Projects & Modules");
  PROJECTS.forEach((p) => {
    ensure(140);
    setFont("bold", 11);
    setColor(INK);
    doc.text(p.title, M, y);
    setFont("normal", 8);
    setColor(ACCENT2);
    const cat = p.category;
    const cw = doc.getTextWidth(cat);
    doc.text(cat, PAGE_W - M - cw, y);
    y += 14;
    setFont("italic", 9);
    setColor(SUB);
    y += text(p.summary, M, y, { size: 9, color: SUB });
    y += 4;
    setFont("normal", 9);
    const rows: [string, string][] = [
      ["Problem", p.problem],
      ["Approach", p.approach],
      ["Outcome", p.outcome],
      ["Impact", p.impact],
      ["Learned", p.learned],
      ["Next", p.future],
    ];
    rows.forEach(([k, v]) => {
      ensure(28);
      setFont("bold", 9);
      setColor(ACCENT);
      doc.text(k + ":", M, y);
      setFont("normal", 9);
      setColor(INK);
      const h = text(v, M + 56, y, { maxWidth: PAGE_W - M * 2 - 56, size: 9 });
      y += h + 2;
    });
    setFont("normal", 8);
    setColor(SUB);
    y += text("Stack: " + p.tags.join(" · "), M, y + 2, { size: 8, color: SUB });
    y += 10;
    doc.setDrawColor(240, 240, 245);
    doc.setLineWidth(0.4);
    doc.line(M, y, PAGE_W - M, y);
    y += 10;
  });

  // ===== Education =====
  sectionTitle("Education");
  EDUCATION.forEach((e) => {
    ensure(36);
    setFont("bold", 10);
    setColor(INK);
    doc.text(e.school, M, y);
    setFont("normal", 9);
    setColor(SUB);
    const pw = doc.getTextWidth(e.period);
    doc.text(e.period, PAGE_W - M - pw, y);
    y += 13;
    setFont("italic", 9);
    setColor(ACCENT);
    doc.text(e.degree, M, y);
    y += 18;
  });

  // ===== Certifications =====
  sectionTitle("Certifications");
  CERTIFICATIONS.forEach((c) => {
    ensure(18);
    setFont("normal", 9);
    setColor(INK);
    doc.text("•  " + c.name, M, y);
    setFont("italic", 8);
    setColor(SUB);
    const issuer = c.issuer;
    const iw = doc.getTextWidth(issuer);
    doc.text(issuer, PAGE_W - M - iw, y);
    y += 14;
  });

  // ===== Timeline =====
  sectionTitle("Trajectory");
  TIMELINE.forEach((t) => {
    ensure(22);
    setFont("bold", 10);
    setColor(ACCENT);
    doc.text(t.year, M, y);
    setFont("bold", 10);
    setColor(INK);
    doc.text(t.label, M + 42, y);
    setFont("normal", 9);
    setColor(SUB);
    const h = text(t.text, M + 110, y, { size: 9, color: SUB, maxWidth: PAGE_W - M * 2 - 110 });
    y += Math.max(16, h + 4);
  });

  // ===== Footer on every page =====
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.4);
    doc.line(M, PAGE_H - M + 8, PAGE_W - M, PAGE_H - M + 8);
    setFont("normal", 8);
    setColor(SUB);
    doc.text(`${PROFILE.name} · ${PROFILE.email} · ${PROFILE.linkedin.replace("https://", "")}`, M, PAGE_H - M + 22);
    const pn = `Page ${i} / ${pageCount}`;
    const pnw = doc.getTextWidth(pn);
    doc.text(pn, PAGE_W - M - pnw, PAGE_H - M + 22);
  }

  doc.save(RESUME_FILENAME);
}

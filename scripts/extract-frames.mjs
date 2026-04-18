/**
 * Frame extraction script for LD Watches scroll animation.
 *
 * Requires ffmpeg installed on PATH:
 *   macOS: brew install ffmpeg
 *   Ubuntu: sudo apt install ffmpeg
 *
 * Usage: npm run extract-frames
 */

import { spawnSync } from "child_process";
import {
  mkdirSync,
  existsSync,
  readdirSync,
  writeFileSync,
  rmSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Config ────────────────────────────────────────────────────────────────
const CONFIG = {
  desktop: {
    input: join(ROOT, "public/video/scroll desktop.mp4"),
    output: join(ROOT, "public/frames/desktop"),
    width: 1920,
    height: 1080,
    targetFrames: 420,
  },
  mobile: {
    input: join(ROOT, "public/video/scroll mobile.mp4"),
    output: join(ROOT, "public/frames/mobile"),
    width: 900,
    height: 1200,
    targetFrames: 420,
  },
};

const JPEG_QUALITY = 82; // mjpeg quality scale: 1 (worst) → 31 (best qscale), use -q:v for mjpeg
const MIN_FRAMES = 300;
const MAX_FRAMES = 500;

// ─── Helpers ───────────────────────────────────────────────────────────────

function checkFfmpeg() {
  const result = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (result.error) {
    console.error(
      "\n❌  ffmpeg not found. Install with:\n   macOS:  brew install ffmpeg\n   Ubuntu: sudo apt install ffmpeg\n"
    );
    process.exit(1);
  }
  console.log("✓  ffmpeg found");
}

function getVideoDuration(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`\n❌  Video not found: ${inputPath}\n`);
    process.exit(1);
  }
  const result = spawnSync(
    "ffprobe",
    [
      "-v", "error",
      "-show_entries", "format=duration",
      "-of", "default=noprint_wrappers=1:nokey=1",
      inputPath,
    ],
    { encoding: "utf8" }
  );
  const duration = parseFloat(result.stdout.trim());
  if (isNaN(duration)) {
    console.error(`❌  Could not read duration for: ${inputPath}`);
    console.error(result.stderr);
    process.exit(1);
  }
  return duration;
}

function computeFps(duration, targetFrames) {
  const rawFps = targetFrames / duration;
  const minFps = MIN_FRAMES / duration;
  const maxFps = MAX_FRAMES / duration;
  const fps = Math.max(minFps, Math.min(maxFps, rawFps));
  return Math.round(fps * 100) / 100;
}

function extractFrames(variant) {
  const cfg = CONFIG[variant];
  console.log(`\n📽  Extracting ${variant} frames…`);
  console.log(`    Input : ${cfg.input}`);
  console.log(`    Output: ${cfg.output}`);

  // Clean existing jpg frames
  if (existsSync(cfg.output)) {
    const existing = readdirSync(cfg.output).filter((f) => f.endsWith(".jpg"));
    if (existing.length > 0) {
      console.log(`    Removing ${existing.length} existing frames…`);
      for (const f of existing) rmSync(join(cfg.output, f));
    }
  }
  mkdirSync(cfg.output, { recursive: true });

  const duration = getVideoDuration(cfg.input);
  console.log(`    Duration: ${duration.toFixed(2)}s`);

  const fps = computeFps(duration, cfg.targetFrames);
  const estimatedFrames = Math.round(duration * fps);
  console.log(`    FPS: ${fps}  →  ~${estimatedFrames} frames`);

  const scaleFilter = [
    `fps=${fps}`,
    `scale=${cfg.width}:${cfg.height}:force_original_aspect_ratio=decrease`,
    `pad=${cfg.width}:${cfg.height}:(ow-iw)/2:(oh-ih)/2`,
  ].join(",");

  const outputPattern = join(cfg.output, "frame-%04d.jpg");

  // mjpeg: -q:v 2 ≈ quality 82 (scale 1=best, 31=worst)
  const result = spawnSync(
    "ffmpeg",
    [
      "-i", cfg.input,
      "-vf", scaleFilter,
      "-c:v", "mjpeg",
      "-q:v", "3",
      "-an",
      outputPattern,
    ],
    { stdio: "inherit", encoding: "utf8" }
  );

  if (result.status !== 0) {
    console.error(`❌  ffmpeg failed for ${variant} (exit code ${result.status})`);
    process.exit(1);
  }

  const frameFiles = readdirSync(cfg.output).filter((f) => f.endsWith(".jpg"));
  console.log(`    ✓  Extracted ${frameFiles.length} frames`);

  return {
    totalFrames: frameFiles.length,
    fps,
    width: cfg.width,
    height: cfg.height,
    format: "jpg",
  };
}

// ─── Main ──────────────────────────────────────────────────────────────────

checkFfmpeg();

const desktopResult = extractFrames("desktop");
const mobileResult = extractFrames("mobile");

const manifest = { desktop: desktopResult, mobile: mobileResult };
const manifestPath = join(ROOT, "public/frames-manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("\n✅  Frame extraction complete!");
console.log(`    Desktop : ${desktopResult.totalFrames} frames`);
console.log(`    Mobile  : ${mobileResult.totalFrames} frames`);
console.log(`    Manifest: ${manifestPath}`);
console.log("\n🚀  Run 'npm run dev' to preview the site.\n");

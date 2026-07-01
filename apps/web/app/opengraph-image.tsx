import { ImageResponse } from "next/og";

// Site-wide Open Graph / social share image (used by Facebook, LinkedIn, X, etc.).
// Generated at build time into a static PNG — no runtime dependencies.
export const alt = "Chapter Real Estate — Winnipeg's Full-Service Real Estate Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top gold accent line */}
        <div style={{ display: "flex", width: "120px", height: "4px", background: "#c8a96e" }} />

        {/* Main text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#c8a96e",
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Chapter Real Estate
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            <div style={{ display: "flex" }}>Winnipeg&apos;s Full-Service</div>
            <div style={{ display: "flex" }}>Real Estate Company</div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 28,
            color: "#8c8c8c",
            fontSize: 24,
          }}
        >
          <span>Brokerage · Property Management · Investments</span>
          <span style={{ color: "#c8a96e" }}>chapterrealestate.ca</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

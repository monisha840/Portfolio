import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.roleLong}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Rendered by satori, which supports only a small CSS subset:
 * flexbox only, explicit `display: flex` on every multi-child element,
 * literal colour values, no CSS variables and no Tailwind.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#000000",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* brand rule along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 12,
            backgroundColor: "#6D001A",
          }}
        />

        {/* oversized monogram, deliberately cropped */}
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -70,
            fontSize: 580,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            color: "#6D001A",
            opacity: 0.5,
          }}
        >
          M
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              color: "#E3315A",
            }}
          >
            PORTFOLIO
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 108,
                fontWeight: 700,
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: "#FFFFFF",
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 27,
                lineHeight: 1.35,
                color: "#FFFFFF",
                opacity: 0.74,
              }}
            >
              {site.roleLong}
            </div>
            <div
              style={{
                marginTop: 34,
                width: 112,
                height: 2,
                backgroundColor: "#6D001A",
              }}
            />
            <div
              style={{
                marginTop: 30,
                fontSize: 34,
                letterSpacing: "-0.02em",
                color: "#E3315A",
              }}
            >
              {site.tagline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#FFFFFF",
              opacity: 0.6,
            }}
          >
            <div style={{ display: "flex" }}>{site.location}</div>
            <div style={{ display: "flex" }}>{site.email}</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

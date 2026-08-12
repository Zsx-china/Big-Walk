import { ImageResponse } from "next/og";

/**
 * Apple touch icon — same single brand symbol as icon.svg:
 * the ember blaze waypoint on dark trail-night, with crosshair ticks.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c1310",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 72,
            height: 6,
            background: "#829a8f",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 6,
            height: 72,
            background: "#829a8f",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            width: 36,
            height: 36,
            background: "#f0641f",
            borderRadius: 8,
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    size,
  );
}

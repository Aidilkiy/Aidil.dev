"use client";

import NetworkBackground from "./networkBackground";

const PageBackground = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.24),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_48%_82%,rgba(251,113,133,0.11),transparent_34%),linear-gradient(135deg,#071A1F_0%,#0B1117_46%,#102A2F_100%)]" />
    <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:72px_72px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,8,22,0.18)_58%,rgba(3,5,12,0.54)_100%)]" />
    <NetworkBackground />
  </div>
);

export default PageBackground;

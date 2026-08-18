import React, { type HTMLAttributes } from "react"

export interface SafariProps extends HTMLAttributes<HTMLDivElement> {
  url?: string
  src?: string
  imageSrc?: string
  videoSrc?: string
  children?: React.ReactNode
  className?: string
  mode?: "default" | "simple"
}

export function Safari({
  url = "https://magicui.design",
  src,
  imageSrc,
  videoSrc,
  children,
  className = "",
  mode = "default",
  ...props
}: SafariProps) {
  const displayUrl = url.replace(/^https?:\/\//, "")

  return (
    <div
      className={`relative w-full rounded-2xl border-2 border-ink bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden ${className}`}
      {...props}
    >
      {/* Safari Browser Chrome Header */}
      <div className="flex h-11 items-center justify-between border-b border-line bg-[#f6f6f6] px-4 gap-3 select-none">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>

        {/* Dynamic Address Bar */}
        <div className="flex flex-1 items-center justify-center max-w-md mx-auto">
          <div className="flex h-7 w-full items-center justify-between rounded-md border border-line bg-white px-3 text-xs shadow-2xs">
            <div className="flex items-center gap-2 text-mute truncate">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-mute shrink-0"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-[11px] text-ink font-medium truncate">
                {displayUrl}
              </span>
            </div>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mute shrink-0 opacity-60"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>

        {/* Right side spacer / action icon */}
        <div className="flex items-center justify-end gap-1.5 w-12 text-mute">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </div>
      </div>

      {/* Safari Viewport Content */}
      <div className="relative w-full overflow-hidden bg-[#18181b]">
        {children ? (
          children
        ) : videoSrc ? (
          <div className="relative w-full aspect-[16/10]">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : imageSrc || src ? (
          <div className="relative w-full aspect-[16/10]">
            <img
              src={imageSrc || src}
              alt="Safari preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

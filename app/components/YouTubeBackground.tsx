"use client";

interface YouTubeBackgroundProps {
  videoId: string;
  children: React.ReactNode;
}

export function YouTubeBackground({
  videoId,
  children,
}: YouTubeBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vídeo do YouTube como Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "calc(100vw + 400px)",
            height: "calc(100vh + 400px)",
            minWidth: "100vw",
            minHeight: "100vh",
          }}
          allow="autoplay; encrypted-media"
          title="Background Video"
        />
      </div>

      {/* Overlay escuro para melhor legibilidade */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Conteúdo da página */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

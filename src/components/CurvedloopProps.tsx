import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  // 1) NBSP ensure seamless wrap
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);

  // 2) Use a stable, safe id (no colons)
  const reactId = useId(); // still fine for uniqueness
  const safeIdRef = useRef(`curve-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`);
  const pathId = safeIdRef.current;

  // Path (wide curve across the viewBox width)
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  // Drag state
  const dragging = useRef(false);
  const lastX = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  // Build enough copies to fill track
  const totalText = useMemo(() => {
    if (!spacing) return text;
    const copies = Math.ceil(1800 / spacing) + 2;
    return Array(copies).fill(text).join("");
  }, [spacing, text]);

  const ready = spacing > 0;

  // ---- Measure text length (robust) ----
  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (!measureRef.current) return;
      const len = measureRef.current.getComputedTextLength();
      if (!cancelled && len > 0) {
        setSpacing(len);
      }
    };

    // Wait for fonts to load (important!)
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => {
        if (!cancelled) {
          // next frame to ensure layout is settled
          requestAnimationFrame(measure);
        }
      });
    } else {
      // fallback
      requestAnimationFrame(measure);
    }

    // Recalculate on resize
    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [text, className]);

  // Initial offset once we have spacing
  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initial = -spacing;
    textPathRef.current.setAttribute("startOffset", initial + "px");
    setOffset(initial);
  }, [spacing]);

  // Animation loop
  useEffect(() => {
    if (!spacing || !ready) return;
    let raf = 0;

    const tick = () => {
      if (!dragging.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const current = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0"
        );
        let next = current + delta;
        const wrap = spacing;
        if (next <= -wrap) next += wrap;
        if (next > 0) next -= wrap;
        textPathRef.current.setAttribute("startOffset", next + "px");
        setOffset(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spacing, speed, ready]);

  // Pointer handlers
  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragging.current = true;
    lastX.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragging.current || !textPathRef.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velRef.current = dx;

    const current = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0"
    );
    let next = current + dx;
    const wrap = spacing;
    if (next <= -wrap) next += wrap;
    if (next > 0) next -= wrap;
    textPathRef.current.setAttribute("startOffset", next + "px");
    setOffset(next);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragging.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragging.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="w-full"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
      >
        {/* Hidden measurer (no styles needed) */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {ready && (
          <text
            xmlSpace="preserve"
            className={`fill-rose-600 ${
              className ?? ""
            }`}
          >
            {/* Use both href + xlinkHref for full browser support */}
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              xlinkHref={`#${pathId}` as any}
              startOffset={offset + "px"}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;

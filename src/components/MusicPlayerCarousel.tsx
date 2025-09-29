import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { categories } from "~/data";
import { MatteGlass } from "~/components/styles";
import { usePlayer } from "~/contexts/PlayerContext";
import { useIsSpatial } from "~/contexts/IsSpatialContext";

export default function MusicPlayerCarousel() {
  const { isCarouselVisible } = usePlayer();
  const { isSpatial } = useIsSpatial();
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isSpatial || <MusicPlayerCarouselContent />}
      {isSpatial && isCarouselVisible && <MusicPlayerCarouselContent />}
    </div>
  );
}

function MusicPlayerCarouselContent() {
  const { isCarouselVisible, activeIndex, toggleIsPlaying, goNext, goPrev } =
    usePlayer();
  const { isSpatial } = useIsSpatial();
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const visibleCategories = offsets.map((offset) => {
    const index =
      (activeIndex + offset + categories.length) % categories.length;
    return { category: categories[index], offset, index };
  });

  function calcSpatialLayout(offset: number) {
    return {
      translateX: offset * 180,
      translateZ: -Math.abs(offset) * 5,
      rotateY: -offset * 20,
      scale: 1 - Math.abs(offset) * (isSpatial ? 0.05 : 0.1),
    };
  }

  useEffect(() => {
    const els = categoryContainerRef.current?.querySelectorAll(
      "[data-offset]"
    ) as unknown as HTMLElement[];
    if (!els) return;

    els.forEach((el) => {
      if (isSpatial) {
        const spatialLayout = calcSpatialLayout(Number(el.dataset.offset));
        animate(el, {
          ...spatialLayout,
          duration: 750,
          ease: "inOutQuad",
        });
      }
    });
  });

  return (
    <div
      style={{
        perspective: "1200px",
        width: "1500px",
        height: 400,
        position: "relative",
        opacity: isCarouselVisible && !isSpatial ? 1 : 0,
        transition: "opacity 50ms ease-out",
      }}
      ref={categoryContainerRef}
    >
      {visibleCategories.map(({ category, offset }) => {
        const isHidden = Math.abs(offset) >= (isSpatial ? 3 : 3);
        const spatialLayout = calcSpatialLayout(offset);

        return (
          <div
            key={category.id}
            data-offset={offset}
            onClick={() => {
              if (offset === 0) {
                toggleIsPlaying();
                return;
              }
              if (offset > 0) {
                goNext();
              } else {
                goPrev();
              }
            }}
            aria-hidden={isHidden}
            style={{
              width: 280,
              borderRadius: 32,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              position: "absolute",
              top: 0,
              // Use left: "50%", once the translateX(-50%) is fixed by WebSpatial
              left: "37.7%",
              transformStyle: "preserve-3d",
              transform: isSpatial
                ? `translateZ(${spatialLayout.translateZ}px) rotateY(${spatialLayout.rotateY}deg) scale(${spatialLayout.scale})`
                : `translateX(${spatialLayout.translateX}px) translateZ(${spatialLayout.translateZ}px) rotateY(${spatialLayout.rotateY}deg) scale(${spatialLayout.scale})`,
              transition: isSpatial
                ? "opacity 200ms ease-out"
                : "transform 750ms ease, box-shadow 750ms ease, opacity 200ms ease-out",
              zIndex: 100 - Math.abs(offset * 5),
              opacity: isHidden ? 0 : 1,
              pointerEvents: isHidden ? "none" : "auto",
              ...MatteGlass(),
            }}
          >
            <CategoryCover cover={category.cover} />
            <div
              style={{
                marginTop: 16,
                marginBottom: 6,
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {category.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategoryCover({ cover }: { cover: string }) {
  return (
    <div
      style={{
        aspectRatio: "1/1",
        borderRadius: 12,
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        enableXr: true,
      }}
    />
  );
}

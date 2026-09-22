import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

const ratioClass = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  tall: "aspect-[3/4]",
} as const;

export function GalleryCard({ project }: { project: GalleryProject }) {
  return (
    <figure
      className="group relative overflow-hidden rounded-lg shadow-card"
      style={{ contain: "layout paint" }}
    >
      <div className={ratioClass[project.ratio]}>
        <FestiveImage
          image={project.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Hover metadata */}
      <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night/85 via-night/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-label text-champagne">{project.category}</p>
            <p className="mt-2 font-display text-xl text-ivory">
              {project.title}
            </p>
            <p className="mt-1 text-sm text-ivory/60">{project.year}</p>
          </div>
          <span
            aria-hidden
            className="text-champagne transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
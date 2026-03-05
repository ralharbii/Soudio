"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Download,
  Trash2,
  ImageIcon,
  ChevronDown,
  CheckSquare,
  Square,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STUDIOS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ImageItem {
  id: string;
  studioId: string | null;
  patternName: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  aspectRatio: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function LibraryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [studioFilter, setStudioFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        sortBy,
        ...(studioFilter ? { studioId: studioFilter } : {}),
      });
      const res = await fetch(`/api/images?${params}`);
      const data = await res.json();
      if (data.success) {
        setImages(data.data.images);
        setPagination(data.data.pagination);
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, studioFilter, sortBy]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === images.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(images.map((i) => i.id)));
    }
  };

  const handleDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`هل أنت متأكد من حذف ${selected.size} صورة؟`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const data = await res.json();
      if (data.success) {
        setSelected(new Set());
        fetchImages();
      }
    } finally {
      setDeleting(false);
    }
  };

  const studio = (id: string | null) =>
    STUDIOS.find((s) => s.id === id);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Studio filter */}
          <div className="relative">
            <select
              value={studioFilter}
              onChange={(e) => {
                setStudioFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none pl-8 pr-4 py-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="">جميع الاستوديوهات</option>
              {STUDIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "newest" | "oldest");
                setCurrentPage(1);
              }}
              className="appearance-none pl-8 pr-4 py-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="newest">الأحدث أولاً</option>
              <option value="oldest">الأقدم أولاً</option>
            </select>
            <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          <div className="mr-auto flex items-center gap-2">
            {selected.size > 0 && (
              <>
                <span className="text-sm text-neutral-500 font-medium">
                  {selected.size} محدد
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    /* TODO: bulk download */
                  }}
                  icon={<Download className="w-4 h-4" />}
                >
                  تحميل المحدد
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  loading={deleting}
                  className="text-red-600 hover:bg-red-50"
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  حذف
                </Button>
              </>
            )}
            {images.length > 0 && (
              <button
                onClick={selectAll}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                {selected.size === images.length ? (
                  <CheckSquare className="w-4 h-4 text-primary-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                تحديد الكل
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            <p className="text-sm text-neutral-500">جاري تحميل الصور...</p>
          </div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-16 text-center">
          <div className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mx-auto mb-5">
            <ImageIcon className="w-10 h-10 text-neutral-400" />
          </div>
          <h3 className="font-black text-xl text-neutral-800 mb-2">مكتبتك فارغة</h3>
          <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
            لم تقم بإنشاء أي صور بعد. اختر استوديو وابدأ رحلة الإبداع!
          </p>
          <Link href="/">
            <Button size="lg">
              ابدأ الإنشاء الآن
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img) => {
              const s = studio(img.studioId);
              const isSelected = selected.has(img.id);
              return (
                <div
                  key={img.id}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden bg-neutral-100 border-2 transition-all cursor-pointer",
                    isSelected
                      ? "border-primary-500 shadow-md"
                      : "border-transparent hover:border-neutral-200"
                  )}
                  onClick={() => toggleSelect(img.id)}
                >
                  {/* Placeholder image */}
                  <div
                    className="w-full aspect-square flex items-center justify-center text-4xl"
                    style={{
                      backgroundColor: s ? `${s.color}12` : "#f4f4f5",
                    }}
                  >
                    {s?.emoji || "🖼️"}
                  </div>

                  {/* Select overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity",
                      isSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <div className="absolute top-2 start-2">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                          isSelected
                            ? "bg-primary-600 border-primary-600"
                            : "bg-white/80 border-white"
                        )}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex gap-1 justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          /* TODO: Download */
                        }}
                        className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur flex items-center justify-center transition-colors"
                        title="تحميل"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(new Set([img.id]));
                          handleDelete();
                        }}
                        className="w-7 h-7 rounded-lg bg-white/20 hover:bg-red-500/60 backdrop-blur flex items-center justify-center transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="px-2.5 py-2 bg-white">
                    <p className="text-xs font-semibold text-neutral-700 truncate">
                      {img.patternName || "نمط"}
                    </p>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[10px] text-neutral-400">
                        {formatDate(img.createdAt)}
                      </p>
                      {s && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                السابق
              </Button>
              <span className="text-sm text-neutral-500 px-3">
                صفحة {currentPage} من {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= pagination.pages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                التالي
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

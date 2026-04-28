import { CalendarDays, Clock3, History, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/ui/badge';
import { cn } from '@/utils/cn';

type CategoryObject = {
  slug?: string | null;
  title?: string | null;
};

type PostMetaProps = {
  category?: string | CategoryObject | null;
  date?: string | null;
  updated?: string | null;
  readTime?: number;
  className?: string;
};

type PostMetaDetail = {
  key: string;
  icon: LucideIcon;
  label: string;
};

const resolveCategory = (category?: string | CategoryObject | null) => {
  if (!category) return null;

  if (typeof category === 'string') {
    const title = category.trim();
    return title ? { title, slug: null } : null;
  }

  const title = category.title?.trim();
  const slug = category.slug?.trim();
  return title ? { title, slug: slug || null } : null;
};

function buildPostMetaDetails({ date, updated, readTime }: PostMetaProps) {
  const details: PostMetaDetail[] = [];

  if (date) {
    details.push({
      key: 'published',
      icon: CalendarDays,
      label: date
    });
  }

  if (updated) {
    details.push({
      key: 'updated',
      icon: History,
      label: `Updated ${updated}`
    });
  }

  if (readTime) {
    details.push({
      key: 'read-time',
      icon: Clock3,
      label: `${readTime} min read`
    });
  }

  return details;
}

export const PostMeta = ({ category, date, updated, readTime, className }: PostMetaProps) => {
  const categoryData = resolveCategory(category);
  const details = buildPostMetaDetails({ date, updated, readTime });

  if (!categoryData && !details.length) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm',
        className
      )}
    >
      {categoryData &&
        (categoryData.slug ? (
          <Badge size="lg" variant="outline" asChild>
            <Link href={`/categories/${categoryData.slug}`}>{categoryData.title}</Link>
          </Badge>
        ) : (
          <Badge size="lg" variant="outline">
            {categoryData.title}
          </Badge>
        ))}
      {details.map((item) => (
        <span key={item.key} className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <item.icon className="size-3.5 opacity-80 sm:size-4" />
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
};

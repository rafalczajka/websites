import { Tags } from '@/domain/posts/ui';
import { Badge } from '@/ui/badge';

type TaxonomyAsideProps = {
  title: string;
  count: number;
  description?: string;
  relatedTags?: string[];
};

export function TaxonomyAside({ title, count, description, relatedTags }: TaxonomyAsideProps) {
  return (
    <section className="space-y-8 md:sticky md:top-20">
      <div className="space-y-4">
        <div className="flex items-start gap-0.5">
          <h1 className="text-2xl sm:text-3xl">{title}</h1>
          <Badge aria-label={`${count} ${count === 1 ? 'article' : 'articles'}`}>{count}</Badge>
        </div>
        {!!description && <p className="text-base leading-relaxed">{description}</p>}
      </div>
      {!!relatedTags?.length && <Tags tags={relatedTags} />}
    </section>
  );
}

type PageAsideProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageAside({ title, description, children }: PageAsideProps) {
  return (
    <section className="space-y-8 md:sticky md:top-20">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        {description ? <p className="text-base leading-relaxed">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

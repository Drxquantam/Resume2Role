const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mb-8 max-w-3xl">
    {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">{eyebrow}</p> : null}
    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
    {description ? <p className="mt-3 text-base leading-7 text-slate-300">{description}</p> : null}
  </div>
);

export default SectionTitle;

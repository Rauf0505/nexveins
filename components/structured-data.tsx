/* JSON-LD goes in the document, not the visible page: it is how the crawler is
   told that a heading is a service, that five pages are one company, and that a
   project page points at software running right now. `<` is escaped so nothing
   in the data can end the script tag early. */
export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

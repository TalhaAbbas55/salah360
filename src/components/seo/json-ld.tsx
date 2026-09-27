/**
 * Renders schema.org structured data. `<` is escaped so no string in the data can close the
 * script tag early. A plain `<script>`, not `next/script`: this is data, not code to run.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

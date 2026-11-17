# Table alignment audit — 2019 Shadowrun 6E PDF

## Changes made

1. Retained all 322 existing flattened text pages for narrative searching.
2. Re-extracted **all 322 pages** in spatial layout mode (`pdftotext -layout`, UTF-8); preserved all spacing/columns in a companion set of 41 monospaced Markdown files at [layout index](layout-source-index.md).
3. Compared rendered PDF images against the extraction on sampled pages 64, 106, 315 and 316; these include columnar rules text and the three parallel tables on page 316.
4. Manually rewrote selected high-risk tables from pages 315–316 into unambiguous Markdown tables at [table corrections](table-corrections.md). This includes the double-paired Structure Ratings table on page 316.

## Confidence

The method removes layout ambiguity for most extracted text and covers every PDF page, but **does not prove all table cells on all 322 pages are correct**. Images, decorative text and unusual table structures may remain ambiguous. Critical rule decisions must use the verified transcription where available, otherwise the spatial extraction plus a cautious ambiguity note. Avoid pretending an unreviewed table has been visually validated.

## Agent lookup policy

For any rule that relies on a row-to-column relationship:

1. Check [verified table corrections](table-corrections.md) first.
2. Otherwise consult the page's [spatial extraction](layout-source-index.md), preserving its monospaced layout in context.
3. Treat flattened text in `core-2019` as search navigation, **not** the authoritative representation of a table.
4. If rows remain ambiguous, say `TABLE_ALIGNMENT_UNVERIFIED` internally and request human visual confirmation before costly irreversible decisions.

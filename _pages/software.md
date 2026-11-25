---
layout: page
title: AI Engineering
subtitle: Software / AI engineering by day
desc: Software / AI engineering by day
permalink: /software/
---

## Seed Company

- Developed and product-managed Seed Company’s first major AI workflow, now in
production: it drafts donor-facing project profiles from field reports, with human accuracy review.
- Built and piloted a retrieval-augmented chatbot (embeddings and vector search) that answers questions for users of Paratext, the premier software platform for Bible translation.
- Built an evaluation harness to compare cost, translation quality, and speed across LLMs using in-context learning for low-resource language translation, informing model selection.
- Benchmarked LLM-generated translation notes with human reviewers and used the findings to decide against the feature.
- Built and maintain the orchestration layer of the production pipeline that fine-tunes our seq2seq machine-translation models for low-resource languages.
- Led the working group and was principal author of Seed Company’s governing AI policy: permitted uses, data classification, and the charter and approval principles of its AI ethics council.

## Parabible

<div class="lead lead-about">If you see nothing else of what I am working on, you should see <https://parabible.com/>.
</div>

Parabible is a tool that has transformed the way I do Old Testament studies by enabling users to perform sophisticated morpho-syntactical searches quickly and easily. See, for example: [What did "gospel" mean? Reading a word through its contemporaries \| Parabible](https://www.youtube.com/watch?v=6_t0W52oHV0).

This work also gives rise to interesting spin-off projects like this RAG query tool: <https://ask-gnt.parabible.com>, which queries the same data and can generate graphs/charts based on the output. Try "How does Paul refer to different members of the trinity per epistle? (collapse Jesus and Christ)" and, when generating the visualization, try adding "use percentages".

## FixPDFs

FixPDFs is a tool I made to resolve challenges faced when working with scanned documents. In PhD work, I often found myself scanning book chapters or receiving scans of journal articles that were double page spread, pages were skew, and sometimes they were color scans. This meant that reading involved contending with inconsistent margins and border noise, often with no OCR. FixPDFs takes PDFs with those sorts of problems and cleans them up, making them easier to read and work with. You can find it at <https://fixpdfs.com/>.

It uses cloudflare workers, supabase, and stripe. It also uses a sprinkling of ML magic. It doesn't earn me a lot of side-income yet. But, as is always the case with side projects, it's been a good learning experience and provides value to me and a few others.

## Portfolio

Here are a few ways you can get an idea of my coding more generally...

### Responsible Disclosures

- Access Control vulnerability in Ex Libris Primo VE: [Security Advisory](https://github.com/jcuenod/jcuenod.github.io/raw/master/assets/files/Security%20Update%20-%20Ex%20Libris%20Primo%20VE%20Log-in%20Security%20Vulnerability%20-%20September%2005%2C%202021.pdf)

### Package Maintainer

- [usfm3](https://github.com/jcuenod/usfm3) - A (fast) error-tolerant USFM 3.x parser with Rust, Python, and TS bindings
- [eflomal](https://github.com/jcuenod/eflomal-rs) - Rust reimplementation of eflomal compiled to wasm with an npm package


### StackOverflow Reputation

<p class="sorep">
  <a href="https://stackoverflow.com/users/123415/jcuenod">Profile:</a>
  <span class="reputation">59,000</span>
  <span class="badge gold">15</span>
  <span class="badge silver">72</span>
  <span class="badge bronze">103</span>
</p>

([Top 10 in South Africa](https://data.stackexchange.com/stackoverflow/query/31885/top-100-stackoverflow-users-from-south-africa))

### Github Repositories

<div class="projects">
</div>

<script src="/assets/js/zepto.min.js"></script>
<script src="/assets/js/programmingportfolio.js"></script>

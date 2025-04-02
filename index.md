---
layout: default
---

<div class="lead pretty-links">
# James Cuénod

Welcome to my portfolio website. My name is [James Cuénod](/) and you can find more about me here. I hope to direct you to information about my two basic interests: *biblical studies* (particularly the Old Testament) and *software development*.

I have a PhD in Biblical Theology, specializing in **Old Testament**. My research area is **Sabbath Theology**. To find out more about my work in the biblical studies arena, take a look [here](biblical/).

I have been programming for more than 2 decades at this point. Since my PhD, I have been working in the Bible translation technology sphere (Clear Bible, Biblica, and Seed Company). You can learn more about my (public) work on software [here](software/). Much of my work is not in public; what is public is often free-time projects. One of my main projects is [parabible.com](https://parabible.com)—a tool that aids in original langauge exegesis. It uses `Clickhouse` (OLAP DB) and a UDF written in `Rust` to do pretty sophisticated queries blindingly fast. It's always a work in progress :).

A lot of the development I do tends to be at the intersection between my discipline of biblical studies my interest in using computers to make that work better/easier so I guess it's a kind of digital humanities but certainly counts as the **intersection between bible and technology**. Sometimes, I blog about that intersection [here](https://jcuenod.github.io/bibletech).

I got into Machine Learning (what is known today as "AI") in 2017 through <fast.ai> and have been exploring the use of NLP in biblical studies ever since (including presenting a paper on this topic at SBL in 2019). One of my current side projects is an online tool that uses a fine-tuned ResNet to clean up document scans (e.g., book chapters and journal articles) to help researchers annotate and search their documents. It automatically rotates skew pages, removes border noise, and binarizes pages, which improves OCR quality. It runs on `Cloudflare` workers & pages, `Supabase`, and `Stripe`. The processing is done on `Docker Swarm` in my homelab using `Machine Learning` and a bunch of vision processing (`OpenCV`) tricks. It's live right now at <https://fixpdfs.com>.

I am also working on a custom programming language called [Chicory](https://chicory-lang.github.io/). It has JSX-like syntax and compiles to JSX. But it removes some of the JS footguns (like null, undefined, and type coercion) and it adds guardrails like strong static typing, pattern matching and ADTs with DHM type inference and type checking. Come and contribute at <https://github.com/chicory-lang>!

If you have any questions or want to hunt me down for some reason (other than malice), please feel free to make contact!
</div>

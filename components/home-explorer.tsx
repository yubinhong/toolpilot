"use client";

import { useMemo, useState } from "react";
import { categories, tools } from "../lib/catalog.mjs";
import { ToolCard } from "./tool-card";

export function HomeExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const searchText = `${tool.name} ${tool.category} ${tool.summary} ${tool.bestFor}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeCategory, normalizedQuery]);

  return (
    <section className="explorer-section shell" aria-labelledby="explorer-title">
      <div className="explorer-heading">
        <div>
          <p className="eyebrow">Start with the job</p>
          <h2 id="explorer-title">Browse the first 50-product decision set.</h2>
        </div>
        <p>Search a draft catalog by tool, category, or the kind of work you need to move forward.</p>
      </div>
      <div className="explorer-controls">
        <label className="search-field">
          <span>Find a tool or task</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try deployment, database, or email"
          />
        </label>
        <div className="category-filter" aria-label="Filter by category">
          <button
            className={activeCategory === "All" ? "filter-button active" : "filter-button"}
            type="button"
            onClick={() => setActiveCategory("All")}
          >
            All tools
          </button>
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "filter-button active" : "filter-button"}
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="tool-grid" aria-live="polite">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      {filteredTools.length === 0 ? (
        <div className="empty-state">
          <strong>No draft matches that search.</strong>
          <span>Try a broader task or reset the category filter.</span>
        </div>
      ) : null}
    </section>
  );
}

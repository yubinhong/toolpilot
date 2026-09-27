# URL Audit Scope

`url-audit.csv` is an inventory of paths registered by the current source code. Its `status` value means only that the path is present in the route registry; it is not a live HTTP result. The `indexed` and `has_backlink` fields remain `unknown` because this checkout does not contain a complete Google Search Console export or backlink inventory.

This file cannot enumerate historical URLs that are absent from the current source. In particular, the absence of a Crypto/DeFi route in the current application is not evidence that an old URL never existed, was not indexed, or has no backlinks. Keep exact legacy path, indexing and backlink evidence in TODO-306 before assigning a 301 or 410 action. No bulk redirect or deletion is justified by this inventory.

Regenerate after an approved route change with `npm run urls:audit`.

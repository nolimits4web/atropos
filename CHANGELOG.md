# Changelog

# [1.0.1](https://github.com/nolimits4web/atropos/compare/v1.0.0-beta.1...v1.0.1) (2021-10-18)

- new `alwaysActive` parameter to keep Atropos "activated"/"entered" all the time
- new `stretchZ` parameter to set `translateZ` offset for multiple Atropos elements in same container (with same `eventsEl`)
- new `commonOrigin` parameter for multiple Atropos elements in same container (with same `eventsEl`)
- remove rotateLock functionality in favor of new smooth rotation ([0ba0d06](https://github.com/nolimits4web/atropos/commit/0ba0d06abb8672a4b785b8bd5e743c2b1f7dff4a))
  - removed `durationEnter` parameter
  - removed `durationLeave` parameter
  - removed `rotateLock` parameter
  - added single `duration` parameter (defaults to `300`)

# [1.0.0-beta.2](https://github.com/nolimits4web/atropos/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-10-15)

### Features

- "always active" functionality, `stretchZ` and `commonOrigin` ([78c177c](https://github.com/nolimits4web/atropos/commit/78c177c054504b122116d317c4d7306ab7ce57ad))
  - new `alwaysActive` parameter to keep Atropos "activated"/"entered" all the time
  - new `stretchZ` parameter to set `translateZ` offset for multiple Atropos elements in same container (with same `eventsEl`)
  - new `commonOrigin` parameter for multiple Atropos elements in same container (with same `eventsEl`)

# [1.0.0-beta.1](https://github.com/nolimits4web/atropos/compare/v0.11.2...v1.0.0-beta.1) (2021-10-15)

### Features

- remove rotateLock functionality in favor of new smooth rotation ([0ba0d06](https://github.com/nolimits4web/atropos/commit/0ba0d06abb8672a4b785b8bd5e743c2b1f7dff4a))
  - removed `durationEnter` parameter
  - removed `durationLeave` parameter
  - removed `rotateLock` parameter
  - added single `duration` parameter (defaults to `300`)

# [0.11.2](https://github.com/nolimits4web/atropos/compare/v0.11.1...v0.11.2) (2021-10-15)

### Bug Fixes

- reset eventsEl bounding rect on pointer leave ([ce09fdb](https://github.com/nolimits4web/atropos/commit/ce09fdbce45f6b0c39ee2817f4997df17675e98d))

# [0.11.1](https://github.com/nolimits4web/atropos/compare/v0.11.0...v0.11.1) (2021-10-15)

### Bug Fixes

- **react:** add `stretchX` and `stretchY` props ([5d06bd9](https://github.com/nolimits4web/atropos/commit/5d06bd93eb1ced5d0dd6a92e2097920166f939ac))

# [0.11.0](https://github.com/nolimits4web/atropos/compare/v0.10.1...v0.11.0) (2021-10-15)

### Features

- transform based on eventsEl (if specified) + stretchX/Y parameters ([b5c59c7](https://github.com/nolimits4web/atropos/commit/b5c59c786cf0a91b8518c4260e394ab9ee20c9e0))

# [0.10.1](https://github.com/nolimits4web/atropos/compare/v0.10.0...v0.10.1) (2021-10-12)

### Bug Fixes

- **svelte:** add default value for `class` prop ([2d05998](https://github.com/nolimits4web/atropos/commit/2d0599880870c19364752f9454c33ad4bac2c316))

# [0.10.0](https://github.com/nolimits4web/atropos/compare/v0.9.6...v0.10.0) (2021-10-12)

### Features

- Atropos Svelte component ([4efc4b3](https://github.com/nolimits4web/atropos/commit/4efc4b3f3d6848ceb77611f61a75e8a05b9112e8)), closes [#6](https://github.com/nolimits4web/atropos/issues/6)

# [0.9.6](https://github.com/nolimits4web/atropos/compare/v0.9.5...v0.9.6) (2021-09-28)

### Bug Fixes

- add missing styles from SCSS ([8c17306](https://github.com/nolimits4web/atropos/commit/8c173067435085001735ec15028095b9d2b91deb))

# [0.9.5](https://github.com/nolimits4web/atropos/compare/v0.9.4...v0.9.5) (2021-09-28)

### Features

- `rotateTouch` now accepts `scroll-x` and `scroll-y` values to keep scrolling on touchscreens ([c13dfb7](https://github.com/nolimits4web/atropos/commit/c13dfb7204be1b3972478b1bdf40973884f4aa5f))

# [0.9.4](https://github.com/nolimits4web/atropos/compare/v0.9.3...v0.9.4) (2021-09-24)

### Bug Fixes

- fix UMD version ([524756d](https://github.com/nolimits4web/atropos/commit/524756d359e38d41d6e6ec9e9e07e76c3299c33b))

# [0.9.3] (2021-07-12)

Initial release

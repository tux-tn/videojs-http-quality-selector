# videojs-http-quality-selector

[![npm version](https://badge.fury.io/js/videojs-http-quality-selector.svg)](https://badge.fury.io/js/videojs-http-quality-selector)
[![ci](https://github.com/tux-tn/videojs-http-quality-selector/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/tux-tn/videojs-http-quality-selector/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Based on [videojs-http-source-selector](https://github.com/jfujita/videojs-http-source-selector)

VideoJS plugin that leverages videojs-contrib-quality-levels plugin to offer manual user-selectable level selection options for adaptive http streams. 

# Difference with http-source-selector plugin

- Using a much more recent version of videojs-plugin generator with updated dependencies
- All console log statement have been removed
- Using correct videojs cog icon
- Not failing when fullscreen toggle button is disabled or removed

# Dependencies

Requires videojs-contrib-quality-levels and work only with adaptive http streams (HLS and Dash)

## Installation

```sh
npm install --save videojs-contrib-quality-levels videojs-http-quality-selector
```

To include videojs-http-quality-selector on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-contirb-quality-levels.min.js"></script>
<script src="//path/to/videojs-http-quality-selector.min.js"></script>
<script>
  var player = videojs('my-video');

  player.httpQualitySelector();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-http-quality-selector via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-contirb-quality-levels')
require('videojs-http-quality-selector');

var player = videojs('my-video');

player.httpQualitySelector();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js','videojs-contirb-quality-levels', 'videojs-http-quality-selector'], function(videojs) {
  var player = videojs('my-video');

  player.httpQualitySelector();
});
```

## Usage

### Labels:

Level labels are generated from the `height` and `bitrate` metadata parsed from the stream QualityLevels sources. If `height` isn't available in the stream metadata, the labels will default to `bitrate`.

### Default settings:

You can configure a bias to lock playback to the highest or lowest resolution by default by passing one of the below plugin options into your videojs initializer.

#### Low:

```js
videojs(video, {httpQualitySelector: { default: 'low' }});

```

#### High:

```js
videojs(video, {httpQualitySelector: { default: 'high' }});

```

#### Auto:

```js
videojs(video, {httpQualitySelector: { default: 'auto' }});

```
## License

MIT. Copyright (c) Sarhan Aissi

Based on work from Justin Fujita


[videojs]: http://videojs.com/

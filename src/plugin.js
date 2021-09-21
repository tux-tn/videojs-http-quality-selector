import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import SourceMenuButton from './components/SourceMenuButton';
import SourceMenuItem from './components/SourceMenuItem';

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-http-quality-selector');
  if (player.techName_ !== 'Html5') {
    return false;
  }
  /**
   *
   * We have to wait for the manifest to load before we can scan renditions for resolutions/bitrates to populate selections
   *
   **/
  player.on(['loadedmetadata'], function(e) {
    // hack for plugin idempodency... prevents duplicate menubuttons from being inserted into the player if multiple player.customHttpSourceSelector() functions called.
    if (player.customHttpSourceSelectorInitialized !== 'undefined' &&
        player.customHttpSourceSelectorInitialized !== true
    ) {
      player.customHttpSourceSelectorInitialized = true;
      const controlBar = player.controlBar;
      const fullscreenToggle = controlBar.getChild('fullscreenToggle').el();

      if (fullscreenToggle) {
        controlBar
          .el()
          .insertBefore(
            controlBar.addChild('SourceMenuButton').el(),
            fullscreenToggle
          );
      } else {
        controlBar.el().appendChild(controlBar.addChild('SourceMenuButton').el());
      }
    }
  });
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function httpQualitySelector
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const httpQualitySelector = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
  videojs.registerComponent('SourceMenuButton', SourceMenuButton);
  videojs.registerComponent('SourceMenuItem', SourceMenuItem);
};

// Register the plugin with video.js.
registerPlugin('httpQualitySelector', httpQualitySelector);

// Include the version number.
httpQualitySelector.VERSION = VERSION;

export default httpQualitySelector;

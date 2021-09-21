import videojs from 'video.js';
import SourceMenuItem from './SourceMenuItem';

const MenuButton = videojs.getComponent('MenuButton');

class SourceMenuButton extends MenuButton {
  constructor(player, options) {
    super(player, options);

    MenuButton.apply(this, arguments);

    const qualityLevels = this.player().qualityLevels();

    // Handle options: We accept an options.default value of ( high || low )
    // This determines a bias to set initial resolution selection.
    if (options && options.default) {
      if (options.default === 'low') {
        qualityLevels.forEach((level, i) => {
          qualityLevels[i].enabled = i === 0;
        });
      } else if ((options.default = 'high')) {
        qualityLevels.forEach((level, i) => {
          qualityLevels[i].enabled = i === qualityLevels.length - 1;
        });
      }
    }

    // Bind update to qualityLevels changes
    this.player()
      .qualityLevels()
      .on(['change', 'addqualitylevel'], videojs.bind(this, this.update));
  }

  createEl() {
    return videojs.dom.createEl('div', {
      className:
        'vjs-quality-selector vjs-menu-button vjs-menu-button-popup vjs-control vjs-button'
    });
  }

  buildCSSClass() {
    return `${MenuButton.prototype.buildCSSClass.call(this)} vjs-icon-cog`;
  }

  update() {
    return MenuButton.prototype.update.call(this);
  }

  createItems() {
    const menuItems = [];
    const levels = this.player().qualityLevels();
    const labels = [];

    levels.reverse().forEach((level, index) => {
      const selected = index === levels.selectedIndex;

      // Display height if height metadata is provided with the stream, else use bitrate
      let label = `${index}`;
      let sortVal = index;

      if (level.height) {
        label = `${level.height}p`;
        sortVal = parseInt(level.height, 10);
      } else if (level.bitrate) {
        label = `${Math.floor(level.bitrate / 1e3)} Kbps`;
        sortVal = parseInt(level.bitrate, 10);
      }

      // Skip duplicate labels
      if (labels.indexOf(label) === -1) {
        labels.push(label);
        menuItems.push(new SourceMenuItem(this.player_, { label, index, selected, sortVal }));
      }
    });

    // If there are multiple quality levels, offer an 'auto' option
    if (levels.length > 1) {
      menuItems.push(new SourceMenuItem(this.player_, {
        label: 'Auto',
        index: levels.length,
        selected: false,
        sortVal: 99999
      }));
    }

    // Sort menu items by their label name with Auto always first
    menuItems.sort(function(a, b) {
      if (a.options_.sortVal < b.options_.sortVal) {
        return 1;
      } else if (a.options_.sortVal > b.options_.sortVal) {
        return -1;
      }
      return 0;
    });

    return menuItems;
  }
}

export default SourceMenuButton;

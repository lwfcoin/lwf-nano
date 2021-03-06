import i18n from './i18n';

const addAboutMenuForMac = ({ template, name }) => {
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about',
        label: i18n.t('About'),
      },
      {
        role: 'quit',
        label: i18n.t('Quit'),
      },
    ],
  });
};

const addAboutMenuForNonMac = ({ template, electron }) => {
  const copyright = `Copyright © 2017 - ${new Date().getFullYear()} LWF Logistics S.a.r.l-s`;
  template[template.length - 1].submenu.push({
    label: i18n.t('About'),
    click(item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          buttons: ['OK'],
          icon: `${__dirname}/assets/images/LWF.png`,
          message: `${i18n.t('LWF Nano')}\n${i18n.t('Version')} ${electron.app.getVersion()}\n${copyright}`,
        };
        electron.dialog.showMessageBox(focusedWindow, options, () => {});
      }
    },
  });
};

const addCheckForUpdates = ({ template, checkForUpdates }) => {
  template[template.length - 1].submenu.push({
    label: i18n.t('Check for updates...'),
    click: checkForUpdates,
  });
};

const menu = {
  build: (electron, checkForUpdates) => {
    const template = menu.buildTemplate(electron);
    if (process.platform !== 'linux') {
      addCheckForUpdates({ template, checkForUpdates });
    }
    if (process.platform === 'darwin') {
      addAboutMenuForMac({ template, name: electron.app.getName() });
    } else {
      addAboutMenuForNonMac({ template, electron });
    }
    return electron.Menu.buildFromTemplate(template);
  },
  onClickLink: (electron, url) => {
    electron.shell.openExternal(url);
  },
  buildTemplate: electron =>
    ([
      {
        label: i18n.t('Edit'),
        submenu: [
          {
            role: 'undo',
            label: i18n.t('Undo'),
          },
          {
            role: 'redo',
            label: i18n.t('Redo'),
          },
          {
            type: 'separator',
          },
          {
            role: 'cut',
            label: i18n.t('Cut'),
          },
          {
            role: 'copy',
            label: i18n.t('Copy'),
          },
          {
            role: 'paste',
            label: i18n.t('Paste'),
          },
          {
            role: 'selectall',
            label: i18n.t('Select all'),
          },
        ],
      },
      {
        label: i18n.t('View'),
        submenu: [
          {
            role: 'reload',
            label: i18n.t('Reload'),
          },
          {
            role: 'togglefullscreen',
            label: i18n.t('Toggle full screen'),
          },
        ],
      },
      {
        label: i18n.t('Window'),
        submenu: [
          {
            role: 'minimize',
            label: i18n.t('Minimize'),
          },
        ],
      },
      {
        label: i18n.t('Help'),
        submenu: [
          {
            label: i18n.t('LWF Website'),
            click: menu.onClickLink.bind(null, electron, 'https://lwf.io'),
          },
          {
            label: i18n.t('LWF Chat'),
            click: menu.onClickLink.bind(null, electron, 'https://lwfcoin.slack.com'),
          },
          {
            label: i18n.t('LWF Explorer'),
            click: menu.onClickLink.bind(null, electron, 'https://explorer.lwf.io'),
          },
          {
            label: i18n.t('LWF Forum'),
            click: menu.onClickLink.bind(null, electron, 'https://lwfcoin.slack.com'),
          },
          {
            type: 'separator',
          },
          {
            label: i18n.t('Report Issue...'),
            click: menu.onClickLink.bind(null, electron, 'https://github.com/lwfcoin/lwf-nano/issues'),
          },
          {
            label: i18n.t('What\'s New...'),
            click: menu.onClickLink.bind(null, electron, 'https://github.com/lwfcoin/lwf-nano/releases'),
          },
        ],
      },
    ]),

};

export default menu;

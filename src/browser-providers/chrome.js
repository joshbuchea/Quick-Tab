export default {

  getTabs: (onlyCurrentWindow = false) => {
    return new Promise(
      resolve => chrome.tabs.query(
        { currentWindow: onlyCurrentWindow ? true : undefined },
        tabs => resolve(tabs),
      ),
    );
  },

  switchToTab: tab => {
    chrome.tabs.update(tab.id, { selected: true });
    chrome.windows.update(tab.windowId, { focused: true });
  },

  closeTab: tab => {
    chrome.tabs.remove(tab.id);
  },

  createTab: url => {
    chrome.tabs.create({ url });
  },

  openConfigureBrowserActionShortcut: () => {
    chrome.tabs.create({ url: 'chrome://extensions/configureCommands' });
  },

  getBrowserActionShortcut: () => {
    return new Promise(
      resolve => {
        chrome.commands.getAll(commands => {
          const command = commands.find(command => {
            return command['name'] === '_execute_browser_action'
              && command['shortcut'];
          });

          resolve(
            command
              ? command['shortcut']
              : null
          )
        });
      },
    );
  },

  saveOptions: options => {
    return new Promise(
      resolve => chrome.storage.sync.set(
        options,
        () => resolve(),
      ),
    );
  },

  getOptions: options => {
    return new Promise(
      resolve => chrome.storage.sync.get(
        options,
        items => resolve(items),
      ),
    );
  },

}
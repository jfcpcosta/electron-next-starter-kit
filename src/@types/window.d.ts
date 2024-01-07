interface ElectronAPI {
  ping: () => Promise<string>
}

interface ElectronVersions {
  versions: {
    node: () => string
    chrome: () => string
    electron: () => string
  }
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
    versions: ElectronVersions
  }
}

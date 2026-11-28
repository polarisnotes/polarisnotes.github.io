import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Custom order for the sidebar. Names must match the page titles exactly.
ExternalPlugin.Explorer({
  sortFn: (a: { displayName: string; isFolder: boolean }, b: { displayName: string; isFolder: boolean }) => {
    const order = [
      "About this project",
      "AI safety",
      "Environmental science",
      "Existential risk",
      "Connections",
      "Reading paths",
    ]
    const rank = (name: string) => {
      const i = order.indexOf(name)
      return i === -1 ? order.length : i
    }
    const diff = rank(a.displayName) - rank(b.displayName)
    if (diff !== 0) return diff
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

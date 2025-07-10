import type { TreeItem } from "@nuxt/ui"

/**
 * Converts a file name to an icon class based on its extension and the current theme.
 *
 * @param fn - The file name to convert.
 * @param theme - The current theme, either "dark" or "light".
 * @returns The icon class corresponding to the file name and theme.
 */
export const fn2icon = (fn: string, theme: string) => {
    const ext = fn.split(".").pop()?.toLowerCase()
    const iconMap: Record<string, string> = {
        // LaTeX files
        tex: theme === "dark" ? "i-vscode-icons-file-type-tex" : "i-vscode-icons-file-type-light-tex",
        bib: theme === "dark" ? "i-vscode-icons-file-type-tex" : "i-vscode-icons-file-type-light-tex",

        // Document formats
        pdf: "i-vscode-icons-file-type-pdf2",
        md: "i-vscode-icons-file-type-markdown",
        txt: "i-vscode-icons-file-type-text",

        // Image formats
        png: "i-vscode-icons-file-type-image",
        jpg: "i-vscode-icons-file-type-image",
        jpeg: "i-vscode-icons-file-type-image",
        eps: "i-vscode-icons-file-type-eps",

        // MS Office formats
        ppt: "i-vscode-icons-file-type-powerpoint",
        pptx: "i-vscode-icons-file-type-powerpoint",
        doc: "i-vscode-icons-file-type-word",
        docx: "i-vscode-icons-file-type-word",
        xls: "i-vscode-icons-file-type-excel",
        xlsx: "i-vscode-icons-file-type-excel",
    }
    return iconMap[ext ?? ""] || "i-vscode-icons-default-file"
}

/**
 * Adds necessary attributes to tree items, including icons and hierarchical values.
 *
 * @param treeItems - An array of `TreeItem` objects to be formatted.
 * @param dirname - The directory name to prepend to the `value` attribute of each tree item. Defaults to "/".
 * @param theme - The theme to determine the appropriate icon for each file. Defaults to "light".
 * @returns The formatted array of `TreeItem` objects with updated `icon` and `value` attributes.
 */
export const formatItems = (treeItems: TreeItem[], dirname: string = "/", theme: string = "light"): TreeItem[] => {
    return treeItems.map((item) => {
        if (!item.label) {
            return item
        } else {
            const isFile = item.label && !item.label.endsWith("/")
            const newItem: TreeItem = {
                label: item.label,
                icon: isFile ? fn2icon(item.label, theme) : undefined,
                type: isFile ? "file" : "folder",
                value: dirname + item.label,
                defaultExpanded: item.defaultExpanded ?? false,
            }
            if (item.children && item.children.length > 0) {
                newItem.children = formatItems(item.children, newItem.value, theme)
            }
            return newItem
        }
    })
}

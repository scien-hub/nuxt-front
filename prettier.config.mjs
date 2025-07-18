// prettier.config.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    useTabs: false,
    semi: false,
    arrowParens: "always",
    printWidth: 120,
    singleQuote: false,
    plugins: ["prettier-plugin-tailwindcss"],
}

export default config

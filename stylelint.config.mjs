/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-recommended-scss", "stylelint-config-recess-order"],
    plugins: ["stylelint-scss"],
    rules: {
        // 疑似要素（::before, ::after など）はコロン2つ表記に統一する
        "selector-pseudo-element-colon-notation": "double",
        // SCSSの@includeや@mixinを誤検出しないようにする
        "at-rule-no-unknown": null,
        // SCSS構文として正しいかを検証する
        "scss/at-rule-no-unknown": true,
        // 詳細度の降順チェックを無効化
        "no-descending-specificity": null,
    },
};

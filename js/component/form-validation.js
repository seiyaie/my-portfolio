// component/form-validation.js

// フォームバリデーション初期化
export const initFormValidation = () => {
    // 要素取得
    const form = document.querySelector(".js-form");
    const fields = form?.querySelectorAll(".js-field");
    const formButton = form?.querySelector(".js-form-button");

    // 必須要素が無ければ処理終了
    if (!form || !fields || !formButton) return;

    // フィールド別エラーメッセージ定義
    const messages = {
        name: {
            valueMissing: "お名前を入力してください。",
        },
        email: {
            valueMissing: "メールアドレスを入力してください。",
            typeMismatch: "正しいメールアドレス形式で入力してください。",
        },
        message: {
            valueMissing: "お問い合わせ内容を入力してください。",
            tooShort: "10文字以上で入力してください。",
        },
        agree: {
            valueMissing: "個人情報の取り扱いに同意してください。",
        },
    };

    // エラー表示要素を取得
    const getErrorElement = (field) => field.closest(".js-form-item")?.querySelector(".js-form-error") ?? null;

    // エラー状態設定
    const setError = (field, message = "") => {
        const item = field.closest(".js-form-item");
        const errorEl = getErrorElement(field);
        if (!item || !errorEl) return;

        const hasMessage = Boolean(message);

        errorEl.textContent = message;
        item.classList.toggle("is-error", hasMessage);
        field.setAttribute("aria-invalid", hasMessage);
    };

    // field状態に応じたエラーメッセージの取得
    const getErrorMessage = (field) => {
        const fieldMessages = messages[field.name];

        // 定義が無い場合はブラウザ標準メッセージ
        if (!fieldMessages) return field.validationMessage;

        const validity = field.validity;

        if (validity.valueMissing && fieldMessages.valueMissing) {
            return fieldMessages.valueMissing;
        }

        if (validity.typeMismatch && fieldMessages.typeMismatch) {
            return fieldMessages.typeMismatch;
        }

        if (validity.tooShort && fieldMessages.tooShort) {
            return fieldMessages.tooShort;
        }

        return field.validationMessage; // fallback
    };

    //単一フィールドのバリデーション
    const validateField = (field) => {
        const isValid = field.checkValidity();
        if (isValid) {
            setError(field, "");
        } else {
            setError(field, getErrorMessage(field));
        }

        updateButtonState();
        return isValid;
    };

    // フォーム全体のバリデーション
    const validateForm = () => {
        let isValid = true;
        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    };

    // ボタン状態管理
    const updateButtonState = () => {
        const isFormValid = form.checkValidity();
        formButton.disabled = !isFormValid;
    };

    // 単一フィールドのイベント登録
    fields.forEach((field) => {
        const handleFieldEvent = () => validateField(field);

        field.addEventListener(field.type === "checkbox" ? "change" : "input", handleFieldEvent);
        field.addEventListener("blur", handleFieldEvent);
    });

    // フォーム送信時はフォーム全体を検証
    form.addEventListener("submit", (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
};

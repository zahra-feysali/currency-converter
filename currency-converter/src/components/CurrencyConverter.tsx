import { useState } from "react";

type CurrencyDirection = "USD_TO_IRR" | "IRR_TO_USD";

const numberFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 2,
});

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [direction, setDirection] = useState<CurrencyDirection>("USD_TO_IRR");

  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);

  const isAmountValid =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 0;

  const isRateValid =
    exchangeRate.trim() !== "" &&
    Number.isFinite(numericRate) &&
    numericRate > 0;

  const isValid = isAmountValid && isRateValid;

  const result = isValid
    ? direction === "USD_TO_IRR"
      ? numericAmount * numericRate
      : numericAmount / numericRate
    : null;

  const inputCurrency = direction === "USD_TO_IRR" ? "دلار" : "ریال";

  const outputCurrency = direction === "USD_TO_IRR" ? "ریال" : "دلار";

  const showAmountError = amount.trim() !== "" && !isAmountValid;

  const showRateError = exchangeRate.trim() !== "" && !isRateValid;

  const handleDirectionChange = (newDirection: CurrencyDirection) => {
    setDirection(newDirection);
    setAmount("");
  };

  return (
    <main className="converter">
      <header className="converter__header">
        <span className="converter__icon">$</span>

        <h1>تبدیل ارز</h1>
      </header>

      <div className="converter__body">
        <div className="direction-selector">
          <button
            type="button"
            className={`direction-selector__button ${
              direction === "USD_TO_IRR" ? "active" : ""
            }`}
            onClick={() => handleDirectionChange("USD_TO_IRR")}
          >
            دلار به ریال
          </button>

          <button
            type="button"
            className={`direction-selector__button ${
              direction === "IRR_TO_USD" ? "active" : ""
            }`}
            onClick={() => handleDirectionChange("IRR_TO_USD")}
          >
            ریال به دلار
          </button>
        </div>

        <div>
          <label htmlFor="amount" className="field__label">
            مبلغ ({inputCurrency})
          </label>

          <input
            id="amount"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="مبلغ را وارد کنید"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="field__input"
            aria-invalid={showAmountError}
          />

          {showAmountError && (
            <p id="amount-error" className="field__error">
              مبلغ باید عددی معتبر و غیرمنفی باشد.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="exchange-rate" className="field__label">
            نرخ هر دلار به ریال
          </label>

          <input
            id="exchange-rate"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="مثلاً 2700000"
            value={exchangeRate}
            onChange={(event) => setExchangeRate(event.target.value)}
            className="field__input"
            aria-invalid={showRateError}
          />

          {showRateError && (
            <p id="rate-error" className="field__error" role="alert">
              نرخ تبدیل باید عددی بزرگ‌تر از صفر باشد.
            </p>
          )}
        </div>

        <div className="result">
          {result !== null && Number.isFinite(result) ? (
            <>
              <p className="result__value" dir="auto">
                {numberFormatter.format(result)}
              </p>

              <span className="result__currency">{outputCurrency}</span>
            </>
          ) : (
            <p className="result__placeholder">
              مبلغ و نرخ تبدیل را وارد کنید.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default CurrencyConverter;

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { trackCopyAction } from "@/lib/analytics";

interface CardInfo {
  type: string;
  pattern: RegExp;
  validLengths: number[];
  icon: string;
}

const CARD_TYPES: CardInfo[] = [
  { type: "Visa", pattern: /^4/, validLengths: [13, 16, 19], icon: "💳" },
  { type: "Mastercard", pattern: /^(5[1-5]|2[2-7])/, validLengths: [16], icon: "💳" },
  { type: "American Express", pattern: /^3[47]/, validLengths: [15], icon: "💳" },
  { type: "Discover", pattern: /^6(?:011|5)/, validLengths: [16, 19], icon: "💳" },
  { type: "Diners Club", pattern: /^3(?:0[0-5]|[68])/, validLengths: [14, 16], icon: "💳" },
  { type: "JCB", pattern: /^(?:2131|1800|35)/, validLengths: [16, 17, 18, 19], icon: "💳" },
  { type: "UnionPay", pattern: /^62/, validLengths: [16, 17, 18, 19], icon: "💳" },
  {
    type: "Maestro",
    pattern: /^(?:5[06]|6[37])/,
    validLengths: [12, 13, 14, 15, 16, 17, 18, 19],
    icon: "💳",
  },
];

function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

function detectCardType(cardNumber: string): CardInfo | null {
  const cleanNumber = cardNumber.replace(/\D/g, "");
  for (const card of CARD_TYPES) {
    if (card.pattern.test(cleanNumber)) {
      return card;
    }
  }
  return null;
}

function maskCardNumber(cardNumber: string): string {
  const clean = cardNumber.replace(/\D/g, "");
  if (clean.length < 4) return clean;
  const last4 = clean.slice(-4);
  const masked = "*".repeat(clean.length - 4) + last4;
  return masked.match(/.{1,4}/g)?.join(" ") || masked;
}

export function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const clean = cardNumber.replace(/\D/g, "");

    if (!clean) {
      return null;
    }

    const cardType = detectCardType(cardNumber);
    const validLength = cardType ? cardType.validLengths.includes(clean.length) : false;
    const validLuhn = luhnCheck(cardNumber);
    const isValid = validLuhn && (cardType ? validLength : clean.length >= 13);

    return {
      cardType,
      cleanNumber: clean,
      maskedNumber: maskCardNumber(cardNumber),
      isValid,
      validLuhn,
      validLength,
      length: clean.length,
      formatted: clean.match(/.{1,4}/g)?.join(" ") || clean,
    };
  }, [cardNumber]);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.cleanNumber);
      trackCopyAction("credit-card-validator", result.cleanNumber.length, "credit-card-validator");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleClear = () => {
    setCardNumber("");
  };

  const sampleCards = [
    { name: "Visa", number: "4111111111111111" },
    { name: "Mastercard", number: "5500000000000004" },
    { name: "Amex", number: "340000000000009" },
    { name: "Discover", number: "6011000000000004" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Card Number
        </Label>
        <Input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 19))}
          placeholder="1234 5678 9012 3456"
          className="h-14 font-mono text-xl tracking-wider"
        />
      </div>

      {/* Sample Cards */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Try Sample Cards
        </Label>
        <div className="flex flex-wrap gap-2">
          {sampleCards.map((card) => (
            <Button
              key={card.name}
              variant="outline"
              size="sm"
              onClick={() => setCardNumber(card.number)}
              className="text-xs"
            >
              {card.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Status */}
          <div
            className={`flex items-center gap-3 rounded-xl border p-4 ${
              result.isValid
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-destructive/30 bg-destructive/10"
            }`}
          >
            {result.isValid ? (
              <CheckCircle2 className="size-8 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="size-8 text-destructive shrink-0" />
            )}
            <div>
              <p
                className={`text-lg font-bold ${result.isValid ? "text-emerald-600" : "text-destructive"}`}
              >
                {result.isValid ? "Valid Card" : "Invalid Card"}
              </p>
              {result.cardType && (
                <p className="text-sm text-muted-foreground">Detected: {result.cardType.type}</p>
              )}
            </div>
          </div>

          {/* Card Info */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-surface/40 p-3">
              <p className="text-xs text-muted-foreground">Card Type</p>
              <p className="font-semibold">{result.cardType?.type || "Unknown"}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/40 p-3">
              <p className="text-xs text-muted-foreground">Length</p>
              <p className="font-semibold">
                {result.length} digits
                {result.cardType && (
                  <span className="text-xs text-muted-foreground ml-1">
                    ({result.cardType.validLengths.join(", ")} expected)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Checks */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Validation Checks
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 p-3">
                {result.validLuhn ? (
                  <CheckCircle2 className="size-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="size-4 text-destructive" />
                )}
                <span className="text-sm">
                  Luhn Check ({result.validLuhn ? "Valid" : "Invalid"})
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 p-3">
                {result.validLength ? (
                  <CheckCircle2 className="size-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="size-4 text-destructive" />
                )}
                <span className="text-sm">
                  Length Check ({result.validLength ? "Valid" : "Invalid"})
                </span>
              </div>
            </div>
          </div>

          {/* Masked Number */}
          <div className="rounded-xl border border-border/60 bg-surface/40 p-3">
            <p className="text-xs text-muted-foreground mb-1">Masked Number (for display)</p>
            <p className="font-mono text-lg tracking-wider">{result.maskedNumber}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleCopy} disabled={!result} variant="outline" className="flex-1">
              {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
              {copied ? "Copied!" : "Copy Number"}
            </Button>
            <Button onClick={handleClear} variant="ghost" className="flex-1">
              Clear
            </Button>
          </div>
        </>
      )}

      {/* Security Notice */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">🔒 Privacy First</p>
        <p>
          All validation happens locally in your browser. No card numbers are sent to any server.
          This tool only validates format and checksums, not card validity.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

const CARD_TYPES = {
  Visa: { prefix: "4", length: 16 },
  Mastercard: { prefix: "5", length: 16 },
  Amex: { prefix: "34", length: 15 },
  Discover: { prefix: "6011", length: 16 },
};

type CardType = keyof typeof CARD_TYPES;

function luhnCheck(num: string): boolean {
  let sum = 0;
  let isEven = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function generateCard(type: CardType): string {
  const { prefix, length } = CARD_TYPES[type];
  let card = prefix;
  while (card.length < length - 1) {
    card += Math.floor(Math.random() * 10);
  }
  // Add Luhn check digit
  for (let i = 0; i < 10; i++) {
    const testCard = card + i;
    if (luhnCheck(testCard)) {
      return testCard;
    }
  }
  return card + "0";
}

function formatCardNumber(num: string): string {
  return num.replace(/(.{4})/g, "$1 ").trim();
}

function getCardType(cardNum: string): CardType | null {
  const num = cardNum.replace(/\s/g, "");
  if (num.startsWith("4")) return "Visa";
  if (num.startsWith("5") && num[1] >= "1" && num[1] <= "5") return "Mastercard";
  if (num.startsWith("34") || num.startsWith("37")) return "Amex";
  if (num.startsWith("6011")) return "Discover";
  return null;
}

export function CreditCardGenerator() {
  const [cardType, setCardType] = useState<CardType>("Visa");
  const [cards, setCards] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const newCards = Array.from({ length: 5 }, () => generateCard(cardType));
    setCards(newCards);
  };

  const handleCopy = async (card: string) => {
    await navigator.clipboard.writeText(card);
    setCopied(card);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(cards.map((c) => formatCardNumber(c)).join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
        <strong>Note:</strong> These are test card numbers for development and testing purposes
        only. Do not use for fraudulent activities.
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Card Type
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(CARD_TYPES) as CardType[]).map((type) => (
            <button
              key={type}
              onClick={() => setCardType(type)}
              className={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                cardType === type
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate Test Cards
      </Button>

      {cards.length > 0 && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Generated Cards
              </Label>
              <Button variant="ghost" size="sm" onClick={copyAll}>
                {copied === "all" ? (
                  <Check className="size-3 mr-1" />
                ) : (
                  <Copy className="size-3 mr-1" />
                )}
                {copied === "all" ? "Copied" : "Copy All"}
              </Button>
            </div>
            <div className="space-y-2">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-3"
                >
                  <div>
                    <span className="font-mono text-lg tracking-wider">
                      {formatCardNumber(card)}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{getCardType(card)}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(card)}>
                    {copied === card ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">CVV/Expiry</p>
            <p className="font-mono">CVV: Any 3 digits | Expiry: Any future date</p>
          </div>
        </>
      )}
    </div>
  );
}

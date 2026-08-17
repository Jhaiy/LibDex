import { Target } from "lucide-react";
import { EmptyMuted } from "@/components/noupload";

type PokemonCard = {
  id: string;
  name: string | null;
  lore: string | null;
  cardImage: string;
  movesImage: string;
  resistanceImage: string;
  weaknessImage: string;
};

type PreviewPokemonInfoProps = {
  card: PokemonCard | null;
};

export default function Preview({ card }: PreviewPokemonInfoProps) {
  if (!card) {
    return (
      <div className="flex flex-col grow gap-4">
        <div className="flex gap-2">
          <Target color="var(--primary)" />
          <h2 className="uppercase">Preview</h2>
        </div>
        <EmptyMuted />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-1/2">
      <div className="flex gap-2">
        <Target color="var(--primary)" />
        <h2 className="uppercase">Scan Complete!</h2>
      </div>
      <div className="bg-muted p-5">
        <div className="flex gap-5">
          <img
            src={card.cardImage}
            alt={card.name ?? "Pokemon card"}
            className="w-35 rounded-lg"
          />
          <div>
            <p className="text-sm text-muted-foreground">Pokémon</p>
            <h2 className="text-2xl font-bold">{card.name ?? "Unknown"}</h2>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Lore</p>
              <p className="whitespace-pre-line text-sm">
                {card.lore ?? "No lore available."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Resistance</p>
              <img
                src={card.resistanceImage}
                alt={`${card.name} resistance`}
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weakness</p>
              <img
                src={card.weaknessImage}
                alt={`${card.name} weakness`}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Moves</p>
          <img
            src={card.movesImage}
            alt={`${card.name} moves`}
            className="w-1/2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

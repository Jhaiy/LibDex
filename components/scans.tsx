"use client";

import { LibraryBig } from "lucide-react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";

type PokemonCard = {
  id: string;
  name: string | null;
  lore: string | null;
  cardImage: string;
  movesImage: string;
  resistanceImage: string;
  weaknessImage: string;
};

type ScansProps = {
  onCardSelect: (card: PokemonCard) => void;
};

type PokemonCardThumbnail = {
  id: string;
  imageUrl: string;
};

export default function Scans({ onCardSelect }: ScansProps) {
  const [cardThumbnails, setCardThumbnails] = useState<PokemonCardThumbnail[]>(
    [],
  );

  const [loadingCardId, setLoadingCardId] = useState<string | null>(null);

  const loadCard = async (id: string) => {
    try {
      setLoadingCardId(id);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const cardResponse = await fetch(`${baseUrl}/get_card/${id}`);

      if (!cardResponse.ok) {
        throw new Error(
          `Failed to fetch card information: ${cardResponse.status}`,
        );
      }

      const cardInfo: {
        id: string;
        name: string | null;
        lore: string | null;
      } = await cardResponse.json();

      const [
        cardImageResponse,
        movesResponse,
        resistanceResponse,
        weaknessResponse,
      ] = await Promise.all([
        fetch(`${baseUrl}/get_card/filepath/${id}`),
        fetch(`${baseUrl}/get_card/moves_filepath/${id}`),
        fetch(`${baseUrl}/get_card/resistance_filepath/${id}`),
        fetch(`${baseUrl}/get_card/weakness_filepath/${id}`),
      ]);

      if (
        !cardImageResponse.ok ||
        !movesResponse.ok ||
        !resistanceResponse.ok ||
        !weaknessResponse.ok
      ) {
        throw new Error("Failed to fetch one or more card images.");
      }

      const [cardBlob, movesBlob, resistanceBlob, weaknessBlob] =
        await Promise.all([
          cardImageResponse.blob(),
          movesResponse.blob(),
          resistanceResponse.blob(),
          weaknessResponse.blob(),
        ]);

      const selectedCard: PokemonCard = {
        id: cardInfo.id,
        name: cardInfo.name,
        lore: cardInfo.lore,

        cardImage: URL.createObjectURL(cardBlob),
        movesImage: URL.createObjectURL(movesBlob),
        resistanceImage: URL.createObjectURL(resistanceBlob),
        weaknessImage: URL.createObjectURL(weaknessBlob),
      };

      onCardSelect(selectedCard);
    } catch (error) {
      console.error("Error loading card:", error);
    } finally {
      setLoadingCardId(null);
    }
  };

  useEffect(() => {
    let objectUrls: string[] = [];

    const loadCardThumbnails = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/fetch_card_ids`);

        if (!response.ok) {
          throw new Error(`Failed to fetch cards: ${response.status}`);
        }

        const cards: { id: string }[] = await response.json();

        const thumbnails = await Promise.all(
          cards.map(async (card) => {
            const imageResponse = await fetch(
              `${baseUrl}/get_card/filepath/${card.id}`,
            );

            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch image for card ${card.id}`);
            }

            const blob = await imageResponse.blob();

            const imageUrl = URL.createObjectURL(blob);

            objectUrls.push(imageUrl);

            return {
              id: card.id,
              imageUrl,
            };
          }),
        );

        setCardThumbnails(thumbnails);
      } catch (error) {
        console.error("Error loading card thumbnails:", error);
      }
    };

    loadCardThumbnails();

    return () => {
      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-wrap">
      <div className="flex gap-2">
        <LibraryBig color="var(--primary)" />
        <h2 className="uppercase">Library</h2>
      </div>
      <div className="flex flex-row flex-wrap shrink-0 grow-0 gap-4">
        {cardThumbnails.map((card) => (
          <img
            key={card.id}
            src={card.imageUrl}
            alt="Pokemon card"
            onClick={() => loadCard(card.id)}
            className={`w-40 cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-2 ${
              loadingCardId === card.id ? "opacity-50" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import TopBar from "@/components/top";
import { EmptyOutline } from "@/components/upload";
import Preview from "@/components/preview";
import Scans from "@/components/scans";
import { useState } from "react";

type PokemonCard = {
  id: string;
  name: string | null;
  lore: string | null;

  cardImage: string;
  movesImage: string;
  resistanceImage: string;
  weaknessImage: string;
};

export default function Main() {
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);

  return (
    <div className="flex flex-col gap-4 p-4">
      <TopBar />
      <div className="flex flex-row flex-wrap gap-2">
        <EmptyOutline />
        <Preview card={selectedCard} />
      </div>
      <Scans onCardSelect={setSelectedCard} />
    </div>
  );
}

import { Info } from "lucide-react";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyMuted() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Info />
        </EmptyMedia>
        <EmptyTitle>Waiting for scans...</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Seems like you haven't uploaded anything. Please upload a card to
          preview here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

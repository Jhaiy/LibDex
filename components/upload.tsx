import { Upload, Scan } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyOutline() {
  return (
    <div className="flex flex-col grow gap-4">
      <div className="flex gap-2">
        <Scan color="var(--primary)" />
        <h2 className="uppercase">Scan a Card</h2>
      </div>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Upload />
          </EmptyMedia>
          <EmptyTitle>Upload your card image here</EmptyTitle>
          <EmptyDescription>
            Browse your photo of a Pokemon Card, front-facing, good lighting
            works best
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg">Choose Photo</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

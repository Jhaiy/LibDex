import { Target } from "lucide-react";
import { EmptyMuted } from "@/components/noupload";

export default function Preview() {
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

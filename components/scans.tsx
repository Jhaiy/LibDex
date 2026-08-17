import { LibraryBig } from "lucide-react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Scans() {
  return (
    <div className="flex flex-col gap-4 flex-wrap">
      <div className="flex gap-2">
        <LibraryBig color="var(--primary)" />
        <h2 className="uppercase">Lib</h2>
      </div>
      <InputGroup className="max-w-xs">
        <InputGroupInput className="uppercase" placeholder="Search card..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

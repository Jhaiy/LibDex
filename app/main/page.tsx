import TopBar from "@/components/top";
import { EmptyOutline } from "@/components/upload";
import Preview from "@/components/preview";
import Scans from "@/components/scans";

export default function Main() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <TopBar />
      <div className="flex flex-row flex-wrap gap-2">
        <EmptyOutline />
        <Preview />
      </div>
      <Scans />
    </div>
  );
}

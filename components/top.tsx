import Image from "next/image";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between p-5 text-white">
      <div className="flex space-x-2">
        <Image src="/images/icon.png" alt="Icon" width={40} height={40} />
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold">DexLib</h1>
          <p className="uppercase text-xs text-muted-foreground">
            Card Collection and Tracker
          </p>
        </div>
      </div>
    </div>
  );
}

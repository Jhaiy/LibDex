"use client";

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
import React, { useRef, useState } from "react";

export function EmptyOutline() {
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

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
          <input
            ref={fileInputReference}
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button
            size="lg"
            disabled={uploading}
            onClick={() => fileInputReference.current?.click()}
          >
            {uploading ? "Uploading..." : "Choose Photo"}
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

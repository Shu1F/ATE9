"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { HeroContent } from "@/types/landing";

type HeroEditorProps = {
  hero: HeroContent;
  onChange: (hero: HeroContent) => void;
  onSave: () => void;
  isSaving: boolean;
};

export function HeroEditor({
  hero,
  onChange,
  onSave,
  isSaving,
}: HeroEditorProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <p className="text-sm text-text-body dark:text-gray-400">
          Update the main headline, supporting copy, and visual.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-headings dark:text-white">
            Heading
          </label>
          <Input
            value={hero.heading}
            onChange={(event) =>
              onChange({ ...hero, heading: event.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-headings dark:text-white">
            Subheading
          </label>
          <Textarea
            value={hero.subheading}
            onChange={(event) =>
              onChange({ ...hero, subheading: event.target.value })
            }
            rows={3}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-headings dark:text-white">
              CTA Label
            </label>
            <Input
              value={hero.ctaLabel}
              onChange={(event) =>
                onChange({ ...hero, ctaLabel: event.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-headings dark:text-white">
              CTA Link
            </label>
            <Input
              value={hero.ctaLink}
              onChange={(event) =>
                onChange({ ...hero, ctaLink: event.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-headings dark:text-white">
            Hero Image URL
          </label>
          <Input
            value={hero.imageUrl}
            onChange={(event) =>
              onChange({ ...hero, imageUrl: event.target.value })
            }
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Hero"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


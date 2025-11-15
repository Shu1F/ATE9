"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PortfolioContent, PortfolioItem } from "@/types/landing";
import { Plus, Trash2 } from "lucide-react";

type PortfolioEditorProps = {
  portfolio: PortfolioContent;
  onChange: (portfolio: PortfolioContent) => void;
  onSave: () => void;
  isSaving: boolean;
};

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const createPortfolioItem = (): PortfolioItem => ({
  id: generateId(),
  title: "",
  description: "",
  imageUrl: "",
  linkUrl: "",
});

export function PortfolioEditor({
  portfolio,
  onChange,
  onSave,
  isSaving,
}: PortfolioEditorProps) {
  const handleItemChange = (index: number, updated: PortfolioItem) => {
    const next = [...portfolio.items];
    next[index] = updated;
    onChange({ ...portfolio, items: next });
  };

  const addItem = () => {
    onChange({ ...portfolio, items: [...portfolio.items, createPortfolioItem()] });
  };

  const removeItem = (id: string) => {
    onChange({
      ...portfolio,
      items: portfolio.items.filter((item) => item.id !== id),
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Portfolio Section</CardTitle>
          <p className="text-sm text-text-body dark:text-gray-400">
            Update showcase projects and supporting copy.
          </p>
        </div>
        <Button variant="outline" onClick={addItem}>
          <Plus className="size-4" /> Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-headings dark:text-white">
              Section Heading
            </label>
            <Input
              value={portfolio.heading}
              onChange={(event) =>
                onChange({ ...portfolio, heading: event.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-headings dark:text-white">
              Subheading
            </label>
            <Input
              value={portfolio.subheading}
              onChange={(event) =>
                onChange({ ...portfolio, subheading: event.target.value })
              }
            />
          </div>
        </div>
        {portfolio.items.length === 0 ? (
          <p className="text-sm text-text-body dark:text-gray-400">
            No portfolio entries yet. Add one to get started.
          </p>
        ) : (
          portfolio.items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text-headings dark:text-white">
                  Project #{index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-headings dark:text-white">
                    Title
                  </label>
                  <Input
                    value={item.title}
                    onChange={(event) =>
                      handleItemChange(index, {
                        ...item,
                        title: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-headings dark:text-white">
                    Image URL
                  </label>
                  <Input
                    value={item.imageUrl}
                    onChange={(event) =>
                      handleItemChange(index, {
                        ...item,
                        imageUrl: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <label className="text-sm font-medium text-text-headings dark:text-white">
                  Link URL (optional)
                </label>
                <Input
                  placeholder="https://example.com"
                  value={item.linkUrl ?? ""}
                  onChange={(event) =>
                    handleItemChange(index, {
                      ...item,
                      linkUrl: event.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-text-headings dark:text-white">
                  Description
                </label>
                <Textarea
                  rows={3}
                  value={item.description}
                  onChange={(event) =>
                    handleItemChange(index, {
                      ...item,
                      description: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          ))
        )}
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Portfolio"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


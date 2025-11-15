"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceItem, ServicesContent } from "@/types/landing";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

type ServicesEditorProps = {
  services: ServicesContent;
  onChange: (services: ServicesContent) => void;
  onSave: () => void;
  isSaving: boolean;
};

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const createService = (): ServiceItem => ({
  id: generateId(),
  title: "",
  description: "",
  backgroundColor: "#FFFFFF",
  gallery: [],
});

export function ServicesEditor({
  services,
  onChange,
  onSave,
  isSaving,
}: ServicesEditorProps) {
  const handleServiceChange = (index: number, updated: ServiceItem) => {
    const next = [...services.items];
    next[index] = updated;
    onChange({ ...services, items: next });
  };

  const handleGalleryChange = (
    serviceIndex: number,
    imageIndex: number,
    value: string
  ) => {
    const service = services.items[serviceIndex];
    const gallery = [...service.gallery];
    gallery[imageIndex] = value;
    handleServiceChange(serviceIndex, { ...service, gallery });
  };

  const addGalleryImage = (serviceIndex: number) => {
    const service = services.items[serviceIndex];
    handleServiceChange(serviceIndex, {
      ...service,
      gallery: [...service.gallery, ""],
    });
  };

  const removeService = (id: string) => {
    onChange({
      ...services,
      items: services.items.filter((service) => service.id !== id),
    });
  };

  const addService = () => {
    onChange({ ...services, items: [...services.items, createService()] });
  };

  const hasServices = useMemo(
    () => services.items.length > 0,
    [services.items.length]
  );

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Services Section</CardTitle>
          <p className="text-sm text-text-body dark:text-gray-400">
            Manage highlight copy and gallery assets shown in the slider.
          </p>
        </div>
        <Button variant="outline" onClick={addService}>
          <Plus className="size-4" /> Add Service
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-headings dark:text-white">
            Intro Text
          </label>
          <Textarea
            rows={3}
            value={services.intro}
            onChange={(event) =>
              onChange({ ...services, intro: event.target.value })
            }
          />
        </div>
        {hasServices ? (
          services.items.map((service, index) => (
            <div
              key={service.id}
              className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text-headings dark:text-white">
                  Service #{index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(service.id)}
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
                    value={service.title}
                    onChange={(event) =>
                      handleServiceChange(index, {
                        ...service,
                        title: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-headings dark:text-white">
                    Background Color (HEX)
                  </label>
                  <Input
                    value={service.backgroundColor}
                    onChange={(event) =>
                      handleServiceChange(index, {
                        ...service,
                        backgroundColor: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-text-headings dark:text-white">
                  Description
                </label>
                <Textarea
                  rows={3}
                  value={service.description}
                  onChange={(event) =>
                    handleServiceChange(index, {
                      ...service,
                      description: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text-headings dark:text-white">
                    Gallery Images (URLs)
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addGalleryImage(index)}
                  >
                    <Plus className="size-4" />
                    Add Image
                  </Button>
                </div>
                {service.gallery.map((url, imageIndex) => (
                  <Input
                    key={`${service.id}-image-${imageIndex}`}
                    value={url}
                    onChange={(event) =>
                      handleGalleryChange(index, imageIndex, event.target.value)
                    }
                  />
                ))}
                {service.gallery.length === 0 && (
                  <p className="text-sm text-text-body dark:text-gray-400">
                    No images yet. Add at least one URL to populate the slider.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-body dark:text-gray-400">
            No services defined yet. Use “Add Service” to create one.
          </p>
        )}
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Services"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


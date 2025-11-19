"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutContent } from "@/types/landing";
import { CharacterCountTextarea } from "../CharacterCountTextarea";

type AboutSectionEditorProps = {
  about: AboutContent;
  onChange: (about: AboutContent) => void;
  onSave: () => void;
  isSaving: boolean;
};

export function AboutSectionEditor({
  about,
  onChange,
  onSave,
  isSaving,
}: AboutSectionEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">About セクション</h2>
        <p className="text-sm text-white/70 mt-1">
          About セクションの見出しと説明文を編集します
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 編集フォーム */}
        <Card>
          <CardHeader>
            <CardTitle>編集</CardTitle>
            <CardDescription>
              LP の About セクションに表示される内容を編集します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CharacterCountTextarea
              id="heading"
              label={
                <>
                  Heading <span className="text-text-body/70">(見出し)</span>
                </>
              }
              value={about.heading}
              onChange={(value) =>
                onChange({
                  ...about,
                  heading: value,
                })
              }
              rows={2}
              placeholder='ATE9 は会社ではない。挑戦者の"家"だ。'
            />

            <CharacterCountTextarea
              id="description"
              label={
                <>
                  Description{" "}
                  <span className="text-text-body/70">(説明文)</span>
                </>
              }
              value={about.description}
              onChange={(value) =>
                onChange({
                  ...about,
                  description: value,
                })
              }
              rows={6}
              placeholder="ATE9 is not a company..."
            />

            <div className="flex justify-end pt-4">
              <Button onClick={onSave} disabled={isSaving}>
                {isSaving ? "保存中..." : "保存"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* プレビュー */}
        <Card>
          <CardHeader>
            <CardTitle>プレビュー</CardTitle>
            <CardDescription>
              編集内容のプレビュー（簡易表示）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-white p-8 rounded-lg space-y-4 min-h-[300px]">
              <h2 className="text-2xl font-bold">{about.heading || "見出し"}</h2>
              <div className="w-16 h-0.5 bg-red-600"></div>
              <p className="text-white/80 leading-relaxed">
                {about.description || "説明文"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MissionContent } from "@/types/landing";
import { CharacterCountTextarea } from "../CharacterCountTextarea";

type MissionSectionEditorProps = {
  mission: MissionContent;
  onChange: (mission: MissionContent) => void;
  onSave: () => void;
  isSaving: boolean;
};

export function MissionSectionEditor({
  mission,
  onChange,
  onSave,
  isSaving,
}: MissionSectionEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Mission セクション</h2>
        <p className="text-sm text-white/70 mt-1">
          Mission セクションの見出しと説明文を編集します
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 編集フォーム */}
        <Card>
          <CardHeader>
            <CardTitle>編集</CardTitle>
            <CardDescription>
              LP の Mission セクションに表示される内容を編集します
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
              value={mission.heading}
              onChange={(value) =>
                onChange({
                  ...mission,
                  heading: value,
                })
              }
              rows={2}
              placeholder="俺たちは限界を壊すために存在する..."
            />

            <CharacterCountTextarea
              id="description"
              label={
                <>
                  Description{" "}
                  <span className="text-text-body/70">(説明文)</span>
                </>
              }
              value={mission.description}
              onChange={(value) =>
                onChange({
                  ...mission,
                  description: value,
                })
              }
              rows={6}
              placeholder='ATE9 is not a "company," but a "movement"...'
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
            <div className="bg-black text-white p-8 rounded-lg space-y-4 min-h-[300px] text-center flex flex-col justify-center">
              <h2 className="text-2xl font-bold">{mission.heading || "見出し"}</h2>
              <p className="text-white/80 leading-relaxed">
                {mission.description || "説明文"}
              </p>
              <div className="w-24 h-0.5 bg-red-600 mx-auto mt-4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


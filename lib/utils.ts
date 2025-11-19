import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 安全なランダム ID を生成するユーティリティ
 * - browser 環境では `crypto.randomUUID` を優先的に使用
 * - 対応していない環境では `Math.random` にフォールバック
 *
 * UI / フォーム編集系で一貫して使用することで、重複実装を避ける
 */
export function generateRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
}

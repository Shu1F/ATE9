# CI & コードスタイルルール（必読）

このプロジェクトは CI がかなり厳しめに設定されています。  
**常に「CI が通るコード」を前提に実装・修正してください。**

## コマンドとツール

- パッケージマネージャーは **npm 固定**
  - 依存追加・削除は `npm install` / `npm uninstall` を使用する
  - Yarn / pnpm など、他のパッケージマネージャー用のファイルやコマンドは追加しない
- CI で実行されるコマンド（必ずローカルでも通る状態にすること）
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`（内部で `npm run typecheck && next build` が走る）

```jsonc
// package.json より（抜粋）
"scripts": {
  "dev": "next dev",
  "build": "npm run typecheck && next build",
  "start": "next start",
  "lint": "eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0",
  "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix --max-warnings=0",
  "typecheck": "tsc --noEmit",
  "format": "prettier \"**/*.{ts,tsx,js,jsx,json,md,css,scss,html}\" --write",
  "format:check": "prettier \"**/*.{ts,tsx,js,jsx,json,md,css,scss,html}\" --check",
  "prepare": "husky install"
}
```

## ESLint / TypeScript の前提

- ESLint は `eslint.config.ts`（flat config） + `eslint-config-next` を利用
- TypeScript は `strict: true` で運用している

```ts
// tsconfig.json（抜粋）
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 守るべきルール

以下は **必ず守る** こと。違反すると `npm run lint` / `npm run typecheck` / `npm run build` が落ちる。

- **未使用の変数・引数・import を残さない**
  - `no-unused-vars` は無効化されており、代わりに `@typescript-eslint/no-unused-vars` が `error`
  - 使わない引数・変数は `_` または `_xxx` で始まる名前にするか、そもそも削除する

```ts
// ✅ OK
const MyComponent: React.FC<{ foo: string; _debug?: boolean }> = ({ foo }) => {
  return <div>{foo}</div>;
};
```

- **`console.log` は原則禁止**
  - `no-console` は `error`
  - 例外として `console.warn` と `console.error` のみ使用可
  - デバッグログはコミット前に必ず削除すること

- **`any` の多用を避ける**
  - `@typescript-eslint/no-explicit-any: "warn"`
  - やむを得ず `any` を使う場合は、なるべく狭いスコープに閉じ、コメントで理由を書く

```ts
// ✅ やむを得ない any の例（理由コメント付き）
const parseUnknownResponse = (value: any) => {
  // NOTE: 外部ライブラリの型が提供されていないため、ここでは any を許容する
  // ...
};
```

- **関数の入出力型はできるだけ明示**
  - `@typescript-eslint/explicit-module-boundary-types: "warn"`
  - 特に hooks / public API 的な関数には戻り値型を付ける

```ts
// ✅ 型を明示した関数
export const useFoo = (): { foo: string } => {
  // ...
  return { foo: 'bar' };
};
```

### 追加してほしくないこと

- `.eslintrc.*` 系の旧設定ファイルは新規追加しない
- 既存の ESLint flat config の思想を壊すような大幅なルール変更はしない（必要な場合はコメントで理由を必ず書く）

## フォーマット（Prettier）

- **Prettier が唯一のフォーマッタ**
- フォーマットは `npm run format` または `lint-staged` に任せる
- 不要に大量のファイルを一括整形しない（意図しない差分を増やさない）

```jsonc
// package.json の lint-staged 設定
"lint-staged": {
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "*.{json,md,css,scss,html}": "prettier --write"
}
```

- 変更したファイルは基本的に `lint-staged` で自動整形される前提で書く
  → フォーマット崩れを残さないように、**コード生成時点で Prettier に沿ったスタイルを意識する**

## GitHub Actions / CI 前提

- CI では `.github/workflows/ci.yml` が実行される

```yaml
# ci.yml（抜粋）
jobs:
  build-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

- **CI を意識した実装方針**
  - 新しいコードを書くときは、**その場で TypeScript と ESLint のエラーが出ないように実装する**
  - 型エラーを回避するためだけの雑なキャスト（`as any` / `as unknown as X`）は極力避ける
  - ビルドに影響する設定変更（`tsconfig.json` / `eslint.config.ts` / `next.config.*` etc.）は慎重に行う

## Husky / lint-staged 前提

- コミット前に `npx lint-staged` が実行される
  - ここで ESLint と Prettier のチェックが走り、問題があればコミットできない

- そのため、**コミット単位は小さめに保ち、エラーが出たらその場で直す**

## AI（Cursor）への指示

このリポジトリでコードを編集・生成するとき、あなた（AI）は以下を守ってください。

1. 変更を提案するときは、**常に `npm run lint` / `npm run typecheck` / `npm run build` が通るかを意識してコードを書くこと。**
2. 未使用変数・未使用 import を残さない。不要なものは積極的に削除すること。
3. `console.log` は出力しない。ログが必要な場合は `console.warn` または `console.error` を使い、できれば最終的には削除すること。
4. `any` や雑な型キャストではなく、可能な限り適切な型定義を行うこと。
5. フォーマット崩れが起きないように、Prettier スタイル（インデント・改行など）を意識してコードを書くこと。
6. 依存関係の追加が必要な場合は、**npm 前提**で `package.json` のみ更新すること（Yarn / pnpm 前提の記述はしない）。
7. CI 設定・Lint 設定を壊すような変更をする場合は、なぜ必要なのかをコメントや説明文で必ず明示すること。

これらのルールに従って、**最初から CI を通る前提の実装・リファクタリング**を行ってください。

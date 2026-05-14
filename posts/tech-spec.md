---
title: 'このブログの技術仕様'
date: '2025-05-14'
tags: ['Tech', 'Next.js']
excerpt: 'Next.js・Vercel・Markdown を組み合わせて構築したこのブログの技術仕様をまとめます。'
---

## 概要

このブログは Next.js を静的サイトとして構築し、Vercel でホスティングしています。記事は Markdown ファイルで管理しており、CMS やデータベースは使用していません。シンプルな構成ながら、モダンな開発体験と高いパフォーマンスを両立しています。

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 15 (App Router) |
| ホスティング | Vercel |
| スタイリング | CSS (Tailwind CSS なし・手書き) |
| 記事管理 | Markdown + gray-matter |
| Markdown 変換 | remark / remark-html |
| バージョン管理 | Git / GitHub |

## ディレクトリ構成

```
my-blog/
├── app/
│   ├── layout.js          # 共通レイアウト（ヘッダー・フッター）
│   ├── page.js            # トップページ（記事一覧）
│   ├── globals.css        # グローバルスタイル
│   ├── PostList.js        # タグフィルター（Client Component）
│   └── posts/
│       └── [id]/
│           ├── page.js            # 記事詳細ページ
│           └── TableOfContents.js # 目次（Client Component）
├── lib/
│   └── posts.js           # 記事データ取得ロジック
└── posts/
    ├── hello-world.md
    └── second-post.md
```

## 記事の管理方法

記事は `posts/` ディレクトリ内の Markdown ファイルとして管理します。ファイルの冒頭にフロントマターと呼ばれるメタデータを記述します。

```markdown
---
title: '記事のタイトル'
date: '2025-05-14'
tags: ['Tech', 'Next.js']
excerpt: '記事の概要。一覧ページに表示されます。'
---

## 見出し

本文をここに書きます。
```

ファイル名が記事の URL になります。`my-post.md` であれば `/posts/my-post` としてアクセスできます。

## データ取得の仕組み

`lib/posts.js` が記事データの取得を一手に担っています。主な関数は3つです。

`getSortedPostsData` は `posts/` ディレクトリ内の `.md` ファイルをすべて読み込み、日付の降順に並べて返します。トップページの記事一覧に使用しています。

`getAllTags` は全記事のタグを収集して重複を除いた配列を返します。タグフィルターの選択肢に使用しています。

`getPostData` は指定した記事の本文を HTML に変換して返します。`remark` による Markdown パースと、見出しへの `id` 付与（目次のアンカーリンク用）もここで行っています。

## レンダリング戦略

Next.js の App Router を使用しており、基本的にすべてのページを **サーバーコンポーネント** として静的に生成しています。

タグフィルターと目次だけはユーザー操作が必要なため、`'use client'` ディレクティブを付けた **クライアントコンポーネント** として分離しています。

```
Server Component（静的生成）
├── app/layout.js
├── app/page.js
└── app/posts/[id]/page.js

Client Component（インタラクティブ）
├── app/PostList.js        ← タグフィルター
└── app/posts/[id]/TableOfContents.js  ← 目次スクロール追従
```

## タグフィルターの仕組み

タグの状態は URL クエリパラメータ（`?tag=Tech`）で管理しています。これにより、フィルター済みの URL を共有・ブックマークできます。`useSearchParams` フックでパラメータを読み取り、`useRouter` で URL を更新しています。

## 目次の仕組み

記事本文の HTML から `<h2>` `<h3>` タグを正規表現で抽出し、各見出しに `id` を付与します。目次コンポーネントは `scroll` イベントを監視し、現在のスクロール位置に対応する見出しをアクティブ表示します。

## デプロイフロー

GitHub リポジトリと Vercel を連携しており、`main` ブランチへのプッシュが自動デプロイのトリガーになります。

```
記事を書く → git add . → git commit → git push → Vercel が自動デプロイ
```

コマンド3つで公開まで完結します。

## パフォーマンスの考え方

データベースや外部 API を持たず、ビルド時にすべてのページを静的ファイルとして生成するため、表示速度が非常に速いのが特徴です。また JavaScript のバンドルサイズを抑えるため、外部 UI ライブラリは使用せず、スタイルはすべて手書き CSS で管理しています。

## 今後の拡張候補

- 検索機能の実装
- OGP 画像の自動生成
- RSS フィードの追加
- Google Analytics の導入
- ダークモード・ライトモード切り替え
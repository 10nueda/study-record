# 📝 Study Record

React + Firebase + Supabase を使った学習記録管理アプリです。  
学習した内容と学習時間を登録・削除し、合計時間を可視化できます。

---

## 🚀 機能概要

- ✅ 学習内容と学習時間の登録  
- ❌ 学習記録の削除  
- 🧮 合計学習時間の集計表示  
- ⚠️ 入力バリデーション（空欄チェック）  
- 🧪 自動テスト + CI連携（GitHub Actions）

---

## 🛠️ 環境設定

プロジェクトルートに `.env` ファイルを作成し、以下のように設定してください：

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

🖥️ 起動方法
以下の手順でローカル開発環境を起動できます：

```
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev
```

🧪 テスト実行方法
```
npm run test
GitHub Actions でも CI が実行されます。
```

📦 ビルド & デプロイ
```
# 本番用ビルド
npm run build

# Firebase Hosting にデプロイ（CI経由で自動化済み）
npm run deploy

# Makefileでbuildとdeployを同時に実行
make deploy
```

🧾 使用技術
React
Vite
Supabase
Firebase Hosting
GitHub Actions (CI/CD)
Jest + React Testing Library
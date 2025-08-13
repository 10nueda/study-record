import React from "react";
import { Todo } from "../Todo";
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

describe("Title Test", () => {
    it("タイトルが学習記録一覧テスト版であること", async () => {
        render(<Todo initialData={[]} />);
        const title = await screen.findByTestId("title");
        expect(title).toHaveTextContent("学習記録一覧テスト版");
    });
});

describe("Todo 登録テスト", () => {
    it("学習内容と時間を入力して登録すると1件追加される", async () => {

        render(<Todo initialData={[
            { id: 1, content: "既存の学習", time: 1 },
        ]} />);

        // 初期のリスト数を取得
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByTestId("record-item")).length;

        screen.debug();
        // フォーム入力 & 登録ボタンをクリック
        const contentInput = await screen.findByPlaceholderText("テキストを入力");
        const timeInput = await screen.findByPlaceholderText("0");
        const addButton = await screen.findByRole("button", { name: "登録" });

        // 🔁 fireEventで値を変更
        fireEvent.change(contentInput, { target: { value: "React Testing" } });
        fireEvent.change(timeInput, { target: { value: "2" } });

        // 🔁 fireEventでボタンクリック
        fireEvent.click(addButton);

        // 追加後のリスト数をチェック
        await waitFor(async () => {
            const newRecords = (await screen.findAllByTestId("record-item")).length;
            expect(newRecords).toBe(initialRecords + 1);
        }, { timeout: 2000 }); // タイムアウト設定を追加);
    });
});

describe("Todo 削除テスト", () => {
    it("削除ボタンを押すと1件削除される", async () => {

        render(<Todo initialData={[
            { id: 1, content: "React Testing", time: 2 },
            { id: 2, content: "Unit Test", time: 3 },
        ]} />);

        // 初期のリスト数を取得
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByTestId("record-item")).length;

        // 削除ボタンをクリック
        const deleteButton = screen.getAllByRole('button', { name: '削除' })[0];
        fireEvent.click(deleteButton);

        // 削除後のリスト数をチェック
        await waitFor(async () => {
            const newRecords = (await screen.findAllByTestId("record-item")).length;
            expect(newRecords).toBe(initialRecords - 1);
        }, { timeout: 2000 }); // タイムアウト設定を追加);
    });
});

describe("Todo 未入力フィールドテスト", () => {
    it("入力せずに登録するとエラーメッセージが表示され、リスト数は変わらない", async () => {
        render(<Todo initialData={[]} />);

        // 「Loading...」が消えるのを待つ（データ取得系処理がある場合）
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

        // 初期のリスト数を取得
        const initialRecords = (await screen.findAllByTestId("record-item")).length;

        // 登録ボタンを取得してクリック（入力は空のまま）
        const addButton = await screen.findByRole("button", { name: "登録" });
        fireEvent.click(addButton);

        // エラーメッセージが表示されていることを確認
        expect(await screen.findByText("入力されていない項目があります")).toBeInTheDocument();

        // リスト数が変わっていないことを確認
        const currentRecords = (await screen.findAllByTestId("record-item")).length;
        expect(currentRecords).toBe(initialRecords);
    });

});
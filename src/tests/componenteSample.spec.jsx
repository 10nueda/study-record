import React from "react";
import { Todo } from "../Todo";
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

describe("Title Test", () => {
    it("タイトルが学習記録一覧テスト版であること", async () => {
        render(<Todo initialData={[]}/>);
        console.log("render完了");
        const title = await screen.findByTestId("title");
        console.log("title取得:", title.textContent);
        screen.debug(title);
        expect(title).toHaveTextContent("学習記録一覧テスト版");
    });
});

describe("Todo 登録テスト", () => {
    it("学習内容と時間を入力して登録すると1件追加される", async () => {

        render(<Todo initialData={[]}/>);
        console.log("render完了");

        // 初期のリスト数を取得
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByTestId("record-item")).length;
        console.log(initialRecords);

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
            expect(newRecords).toBeGreaterThan(initialRecords);
            console.log(newRecords);
        });
    });
});

describe("Todo 削除テスト", () => {
    it("削除ボタンを押すと1件削除される", async () => {

        render(<Todo initialData={[]}/>);
        console.log("render完了");

        // 初期のリスト数を取得
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByTestId("record-item")).length;
        console.log(initialRecords);

        screen.debug();
        // 削除ボタンをクリック
        const deleteButton = screen.getAllByRole('button', { name: '削除' })[0];
        fireEvent.click(deleteButton);

        // 削除後のリスト数をチェック
        await waitFor(async () => {
            const newRecords = (await screen.findAllByTestId("record-item")).length;
            expect(newRecords).toBeLessThan(initialRecords);
            console.log(newRecords);
        });
    });
});

describe("Todo 未入力フィールドテスト", () => {
    it("入力せずに登録するとエラーメッセージが表示され、リスト数は変わらない", async () => {
        render(<Todo initialData={[]}/>);
        console.log("render完了");

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
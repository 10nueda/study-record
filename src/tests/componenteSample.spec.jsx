import React from "react";
import { Todo } from "../Todo";
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

// describe("Title Test", () => {
//     it("タイトルが学習記録一覧テスト版であること", async () => {
//         render(<Todo />);
//         console.log("render完了");
//         const title = await screen.findByTestId("title");
//         console.log("title取得:", title.textContent);
//         screen.debug(title);
//         expect(title).toHaveTextContent("学習記録一覧テスト版");
//     });
// });

describe("Todo 登録テスト", () => {
    it("学習内容と時間を入力して登録すると1件追加される", async () => {

        render(<Todo />);
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

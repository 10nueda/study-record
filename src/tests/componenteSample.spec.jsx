import { Todo } from "../Todo";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";

describe("Title Test", () => {
    it("タイトルが学習記録一覧テスト版であること", async () => {
        render(<Todo />);
        const title = await screen.findByTestId("title");
        expect(title).toHaveTextContent("学習記録一覧テスト版");
    });
});

// describe("Todo 登録テスト", () => {
//     it("学習内容と時間を入力して登録すると記録が1件追加される", async () => {
//         render(<Todo />);
//         const contentInput = await screen.findByTestId("content-input");
//         const timeInput = await screen.findByTestId("time-input");
//         const addButton = await screen.findByTestId("add-button");

//         // 入力
//         fireEvent.change(contentInput, { target: { value: "Reactテスト" } });
//         fireEvent.change(timeInput, { target: { value: "60" } });

//         // 登録
//         fireEvent.click(addButton);

//         // 件数が1つ増えていること
//         expect(screen.queryAllByTestId("record-item").length).toBe(1);
//         expect(screen.getByText(/Reactテスト/)).toBeInTheDocument();
//         expect(screen.getByText(/60/)).toBeInTheDocument();

//     })
// })
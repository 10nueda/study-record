// // ✅ モックを最上部に定義
// const mockGetAllTodos = jest.fn();
// const mockAddTodo = jest.fn();
// const mockDeleteTodo = jest.fn();

// jest.mock("../lib/todo", () => ({
//   getAllTodos: mockGetAllTodos,
//   addTodo: mockAddTodo,
//   deleteTodo: mockDeleteTodo,
// }));

import React from "react";
import { Todo } from "../Todo";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルが学習記録一覧テスト版であること", async () => {
    render(<Todo />);
    console.log("render完了");
    const title = await screen.findByTestId("title");
    console.log("title取得:", title.textContent);
    screen.debug(title);
    expect(title).toHaveTextContent("学習記録一覧テスト版");
  });
});

// describe("Todo 登録テスト", () => {
//   it("学習内容と時間を入力して登録すると記録が1件追加される", async () => {
//   mockGetAllTodos.mockResolvedValueOnce([]);
//   mockAddTodo.mockResolvedValueOnce({ id: 1, contents: "Reactテスト", time: "60" });
//   mockGetAllTodos.mockResolvedValueOnce([
//     { id: 1, contents: "Reactテスト", time: "60" }
//   ]);

//     render(<Todo />);

//     // 入力要素を取得
//     const contentInput = await screen.findByTestId("content-input");
//     const timeInput = await screen.findByTestId("time-input");
//     const addButton = await screen.findByTestId("add-button");

//     // まだデータがない（0件）
//     const before = screen.queryAllByTestId("record-item").length;
//     expect(before).toBe(0);

//     // 入力して登録
//     fireEvent.change(contentInput, { target: { value: "Reactテスト" } });
//     fireEvent.change(timeInput, { target: { value: "60" } });
//     fireEvent.click(addButton);

//     // 更新されたデータを待つ
//     await waitFor(() => {
//       const after = screen.getAllByTestId("record-item").length;
//       expect(after).toBe(before + 1);
//     });

//     expect(screen.getByText("Reactテスト")).toBeInTheDocument();
//     expect(screen.getByText("60")).toBeInTheDocument();
//   });
// });

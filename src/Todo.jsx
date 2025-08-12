import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getAllTodos } from "./lib/todo";

export const Todo = () => {
  const [contents, setContents] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [sumTime, setSumTime] = useState(0);
  const [todosData, setTodosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 合計時間を算出する関数
  const updateTime = (todos) => {
    return todos.reduce((acc, cur) => acc + parseInt(cur.time), 0);
  };

  // 初回読み込み時に行う処理
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchTodos = await getAllTodos();
        setTodosData(fetchTodos);
        setSumTime(updateTime(fetchTodos));
        setTime("0");
      } catch (error) {
        console.error("読込エラーです", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 学習内容・時間の入力内容を反映するonChange
  const onChangeContents = (e) => setContents(e.target.value);
  const onChangeTime = (e) => setTime(e.target.value);

  // データ追加イベント
  const onClickAdd = async () => {
    if (contents === "" || time === "") {
      return setError("入力されていない項目があります");
    } try {
      setError("");
      await addTodo(contents, time);
      setContents("");
      setTime("0");
      const updatedTodos = await getAllTodos();
      setTodosData(updatedTodos);
      setSumTime(updateTime(updatedTodos));
    } catch (err) {
      setError("登録に失敗しました");
      console.error(err);
    }
  };

  // データ削除イベント
  const onClickDelete = async (id) => {
    await deleteTodo(id);
    const updatedTodos = await getAllTodos();
    setTodosData(updatedTodos);
    setSumTime(updateTime(updatedTodos));
  }

  // 画面描写
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div>
        <h1>学習記録一覧</h1>
        <div>
          <span>学習内容</span>
          <input type="text" value={contents} onChange={onChangeContents} />
        </div>
        <div>
          <span>学習時間</span>
          <input type="number" value={time} onChange={onChangeTime} />
        </div>
        <div>
          <span>入力されている学習内容：{contents}</span>
        </div>
        <div>
          <span>入力されている時間：{time}</span>
        </div>
        <div>
          {todosData.map((todo) => {
            return (
              <ul key={todo.id} style={{ padding: 0 }}>
                <li>{todo.contents}{todo.time}時間<button onClick={() => onClickDelete(todo.id)}>削除</button></li>
              </ul>
            );
          })}
        </div>
        <button onClick={onClickAdd}>登録</button>
        <p>合計時間：{sumTime}/1000h</p>
        <div>{error}</div>
      </div>
    </>
  );
};

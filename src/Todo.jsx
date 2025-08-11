import { useEffect, useState } from "react";
import { addTodo, deleteTodo, GetAllTodos } from "./lib/todo";

export const Todo = () => {
  const [contents, setContents] = useState("");
  const [time, setTime] = useState("");

  // const [records, setRecords] = useState([]);
  // const newRecord = { title: contents, time: time };

  const [error, setError] = useState("");
  const [sumTime, setSumTime] = useState(0);

  // useState内のstate
  const [todosData, setTodosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 合計時間を算出する関数
  const addTime = (record) => {
    return record.reduce((acc, cur) => acc + parseInt(cur.time), 0);
  };

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        setIsLoading(true);
        const todosData = await GetAllTodos();
        setTodosData(todosData);
        setSumTime(addTime(todosData));
      } catch (error) {
        console.error("読込エラーです", error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllTodos();
  }, []);

  // onChangeイベント
  const onChangeContents = (event) => setContents(event.target.value);
  const onChangeTime = (event) => setTime(event.target.value);

  // データ追加イベント
  const onClickAdd = async () => {
    if (contents === "" || time === "") {
      return setError("入力されていない項目があります");
    } try {
      setError("");
      await addTodo(contents, time);
      setContents("");
      setTime("0");

      const updatedTodos = await GetAllTodos();
      setTodosData(updatedTodos);
      setSumTime(addTime(updatedTodos));
    } catch (err) {
      setError("登録に失敗しました");
      console.error(err);
    }
  };

  // データ削除イベント
  const onClickDelete = async (id) => {
    await deleteTodo(id);
    const updatedTodos = await GetAllTodos();
    setTodosData(updatedTodos);
    setSumTime(addTime(updatedTodos));
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
          {todosData.map((todo, index) => {
            return (
              <div key={index}>
                <p>
                  {todo.contents}
                  {todo.time}時間
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={onClickAdd}>登録</button>
        <span> </span>
        <p>合計時間：{sumTime}/1000h</p>
        <div>{error}</div>
      </div>
    </>
  );
};

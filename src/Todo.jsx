import { useEffect, useState } from "react";
import { GetAllTodos } from "./lib/todo";

export const Todo = () => {
  const [todosData,setTodosData] = useState([]);
  useEffect(()=>{
    const getAllTodos = async() =>{
      const todosData = await GetAllTodos();
      setTodosData(todosData)
    }
    getAllTodos();
  },[])

  console.log(todosData);

  const [contents, setContents] = useState("");
  const onChangeContents = (event) => setContents(event.target.value);
  const [time, setTime] = useState("");
  const onChangeTime = (event) => setTime(event.target.value);

  const [records, setRecords] = useState([]);
  const newRecord = { title: contents, time: time };

  const [error, setError] = useState("");
  const [sumTime, setSumTime] = useState(0);

  const onClickAdd = () => {
    if (contents === "" || time === "") {
      return setError("入力されていない項目があります");
    } else {
      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      setContents("");
      setTime("0");
      setError("");

      const addTime = (record) => {
        return record.reduce((acc, cur) => acc + parseInt(cur.time), 0);
      };
      setSumTime(addTime(updatedRecords));
    }
  };

  return (
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
          {todosData.map((todo,id) =>{
            return (
              <div key={id}>
                <p>
                  {todo.contents}
                  {todo.time}時間
                </p>
              </div>
            );
          })}
        </div>
        <div>
          {records.map((record, index) => {
            return (
              <div key={index}>
                <p>
                  {record.title}
                  {record.time}時間
                </p>
              </div>
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

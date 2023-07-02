
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  let [data,setData]=useState([]);

  const dataId =useRef(0);

  const getData  = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1').then(res=>res.json());

    const initData = res.map(e=>{
      return {
      author : e.name,
      content : e.body,
      emotion : Math.floor(Math.random()*5)+1,
      created_date : new Date().getTime(),
      id : dataId.current++,
      
      };
    });
    setData(initData);
  }

    const onCreate = useCallback((author, content, emotion) =>{
    const created_date = new Date().getTime();
    const newItem ={
      author, 
      content, 
      emotion,
      created_date,
      id : dataId.current++,
    }
    setData((data)=>[newItem,...data])
  },[])

  const onDelete = useCallback((itemid)=>{
    setData(data=>data.filter(e=>e.id!==itemid));
  },[])

  const onEdit = useCallback((targetId,newContent) =>{
    setData(data=>data.map(it=>it.id === targetId ? {...it,content: newContent} : it)
    )
  },[])

  const getDiaryAnalysis = useMemo(()=>{
    const goodCount = data.filter(e=>e.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = goodCount/data.length * 100;
    return ({goodCount,badCount,goodRatio})
  },[data.length]);

  const {goodCount,badCount,goodRatio} = getDiaryAnalysis;


  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="App">
  <DiaryEditor onCreate={onCreate} ></DiaryEditor>
  <div>기분 좋은 일기 개수: {goodCount}</div>
  <div>기분 나쁜 일기 개수: {badCount}</div>
  <div>기분 좋은 일기 비율: {goodRatio}%</div>
  <DiaryList diarylist={data} onDelete={onDelete} dataId={dataId} onEdit={onEdit}></DiaryList>
    </div>
  );
}

export default App;

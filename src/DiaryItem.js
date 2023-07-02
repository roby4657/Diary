import { useState,memo } from "react";

const DiaryItem = ({
    author,
    content,
    created_date,
    emotion,
    id,
    onDelete,
    onEdit,
    dataId})=>{

    const handleDelete = () =>{
        if(window.confirm(`${id}번째 일기를 삭제할까요?`)){
            onDelete(id);
            dataId.current--;
    }}

    const handleEdit =()=>{
        if(modify.length<5){
            return;
        }

        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
            onEdit(id,modify);
            toggleIsEdit();
        }
    }
    const [isEdit,setIsEdit]=useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);


    const [modify,setModify] = useState(content);
    const handleQuitEdit=()=>{
        setIsEdit(false);
        setModify(content);

    }

    return <div className="DiaryItem">
        <div className="info">
            <span>작성자 : {author} | 감정점수 : {emotion}</span>
            <br />
            <span className="date">
               {new Date(created_date).toLocaleString()} 
            </span>
            
        </div>
        <div className="content">
            {isEdit ? <>
            <textarea value = {modify}
             onChange={e=>{
                setModify(e.target.value);
             }} />
            </> : <>{content}</>}</div>
        {isEdit ? <> 
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
        </> : <>
        <button onClick={handleDelete}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
        </>}
        </div>
}

export default memo(DiaryItem);
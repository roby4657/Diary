import { useRef, useState ,memo ,useEffect} from "react";

function DiaryEditor ({onCreate}){
 
    const authorInput = useRef();
    const contentInput = useRef();

    let [state,setState]=useState({
        author : '',
        content : '',
        emotion : 1,
    });

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    const saveContent = () =>{
        if(state.author.length<1){
            authorInput.current.focus();
            return;
        }
        if(state.content.length<5){
            contentInput.current.focus();
            return;
        }

        onCreate(state.author,state.content,state.emotion);
        alert("저장 성공~");
        setState({
            author : '',
            content : '',
            emotion : 1,
        })
    }

    
    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            작성자: &nbsp; 
            <input
            ref ={authorInput}
            name = "author"
            value={state.author} 
             onChange={handleChangeState}/>
        </div>
        내용
        <div>
            
            <textarea name="content" value={state.content}
            ref={contentInput}
            onChange={handleChangeState}/>
        </div>

        <div>
            오늘의 감정 점수 : <select name="emotion" value={state.emotion} 
            onChange={handleChangeState}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <button onClick={saveContent}>일기 저장하기</button>
    </div>;
}
export default memo(DiaryEditor);
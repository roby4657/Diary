import DiaryItem from './DiaryItem.js';

const DiaryList=({diarylist,onDelete,dataId,onEdit})=>{
    
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h3>{diarylist.length}개의 일기가 있습니다.</h3>
        <div>
            {diarylist.map(e => 
                <DiaryItem key = {e.id} {...e} onEdit={onEdit} onDelete={onDelete} dataId={dataId}/>
               
            )}
        </div>
    </div>)
}

export default DiaryList
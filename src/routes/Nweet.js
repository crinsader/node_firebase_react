import { dbService, storageService } from "fbase"
import { useState } from "react/cjs/react.development"

const Nweet = ({ nweetObj, userObj }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [modiText, setModiText] = useState("")

  const onDeleteClick = event => {
    let ok = window.confirm("정말로 삭제?")
    if (ok === true) {
      dbService.collection("nweets").doc(nweetObj.docId).delete()
      if (nweetObj.attachmentUrl !== "") {
        storageService.refFromURL(nweetObj.attachmentUrl).delete()
      }
    }
  }

  const onModifyClick = event => {
    setIsEdit(!isEdit)
  }

  const modifySubmit = () => {
    let ok = window.confirm("정말로 수정하시겠습니까?")
    if (ok === true) {
      dbService.collection("nweets").doc(nweetObj.docId).update({
        text: modiText,
        createAt: Date.now()
      })
    }
    setIsEdit(!isEdit)
  }

  const onchange = event => {
    event.preventDefault()
    const { target: { value } } = event
    setModiText(value)
  }

  return (
    <tr key={nweetObj.docId}>
      <td>
        {nweetObj.docId}
      </td>
      <td>
        {isEdit
          ? <span>
              {nweetObj.text}
              <input type="text" value={modiText} onChange={onchange} />
              <button onClick={modifySubmit}>수정완료</button>
              <button onClick={onModifyClick}>취소</button>
            </span>
          : <span>
              {nweetObj.text}
            </span>}
      </td>
      <td>
        {nweetObj.createAt}
      </td>
      <td>
        {nweetObj.email}
      </td>
      <td>
        <img src={nweetObj.attachmentUrl} width="100px" />
      </td>
      <td>
        {userObj.uid === nweetObj.creatorId
          ? <span>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={onModifyClick}>수정</button>
            </span>
          : <span />}
      </td>
    </tr>
  )
}

export default Nweet

import { useState, useEffect } from "react"
import { dbService } from "fbase"
import Nweet from "./Nweet"
import { storageService } from "fbase"
import { v4 as uuidv4 } from "uuid"

const Home = ({ userObj }) => {
  //console.log(userObj)

  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState("")

  const getNweets = async () => {
    // 1.파일을 stoarage에 upload하고
    // 2.그 URL을 firestore에 저장한다.
    // storage에 저장 할때는 UID가 자동 생성 되지 않게 설계되었다.
    // 먼저 uuid 모듈 설치 : uid 자동 생성기 (npm install uuid)
    // https://github.com/uuidjs/uuid/#readme
    //console.log(uuidv4());
    // 만들어질 디렉토리와 파일명을 미리 준비한다.

    let dataArray = []
    const dbNweets = await dbService.collection("nweets").get()
    dbNweets.forEach(doc => {
      let data = doc.data()
      data.docId = doc.id
      dataArray.push(data)
    })
    setNweets(dataArray)
  }
  //console.log("여기는 포묵 밖", nweets)

  useEffect(() => {
    //getNweets()
    //firestor에서 데이터 변경이 일어나면 자동 갱신하도록 고고싱
    //onsnapshot 이벤트 헨들러 함수를 사용한닥
    dbService.collection("nweets").onSnapshot(snapshot => {
      const newArray = snapshot.docs.map(doc => {
        return { docId: doc.id, ...doc.data() }
      })
      setNweets(newArray)
    })
  }, [])

  const onSubmit = async event => {
    event.preventDefault()

    //console.log(uuidv4())
    let downloadUrl = ""
    if (attachment) {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const repons = await attachmentRef.putString(attachment, "data_url")
      downloadUrl = await repons.ref.getDownloadURL()
    }

    //console.log("uuidv4 >>>", downloadUrl)
    // firestore는 mongoDB  구조와 같닥
    // firebase와 같은 nosql계통의 collection은 RDB(관계형데이터)의 table이다
    // RDB에서 row는 firebase의 Document(js객체)
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      email: userObj.email,
      attachmentUrl: downloadUrl
    })
    setNweet("")
    setAttachment("")
  }

  const onchange = event => {
    event.preventDefault()
    //setNweet(event.target.value)
    // event 객체를 구조분해 하긱
    const { target: { value } } = event
    setNweet(value)
  }
  const onFileChange = event => {
    //console.dir(event.target.files[0])
    const { target: { files } } = event
    const reader = new FileReader()
    //모두 읽어드리면 후속 처리하긱
    reader.onloadend = progressEvent => {
      //console.log(progressEvent.currentTarget.result)
      const { currentTarget: { result } } = progressEvent
      setAttachment(result)
    }
    //로컬의 파일을 일어 올때도 Ajax 사용처럼 비동기 처리 된다.
    reader.readAsDataURL(files[0])
  }

  return (
    <div>
      <span>Home</span>
      <form onSubmit={onSubmit}>
        <input type="text" value={nweet} onChange={onchange} />
        <input type="submit" value="Nweet" />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment &&
          <div>
            <img src={attachment} width="100%" />
            <input type="button" value="제거" onClick={() => setAttachment("")} />
          </div>}
      </form>
      <div>
        <table border="1px solid black">
          <tbody>
            <tr>
              <th>번홍</th>
              <th>텍스트</th>
              <th>시간</th>
              <th>글쓰니</th>
              <th>사진</th>
              <th>삭제/수정</th>
            </tr>
            {nweets.map((data, i) => {
              return <Nweet key={data.docId} nweetObj={data} userObj={userObj} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home

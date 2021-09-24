import { dbService } from "fbase"
import { setUncaughtExceptionCaptureCallback } from "process"

const List = () => {
  let dataArray = []
  dbService.collection("car").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      dataArray.push({
        Id: doc.id,
        Name: doc.data().name,
        Age: doc.data().age,
        Year: doc.data().year
      })
    })
  })
  const qwer = () => {
    console.log(dataArray)
  }
  qwer()
  //console.log(dbService)
  return (
    <div>
      <table border="1px solid black">
        <tbody>
          <tr>
            <th>번홍</th>
            <th>이름</th>
            <th>나이</th>
            <th>생년월일</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default List

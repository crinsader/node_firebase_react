import { dbService } from "fbase"
import { useState } from "react"

const dataArray = []
const List = () => {
  dbService.collection("car").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      dataArray.push({
        Id: doc.id,
        Name: doc.data().name,
        Age: doc.data().age,
        Year: doc.data().year
      })
    })
    console.log(dataArray[0])
  })

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
          <tr>
            <td colSpan="4" />
            {dataArray}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default List

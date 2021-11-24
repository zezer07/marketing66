
import {useState,useEffect} from 'react'
import axios from 'axios'
import './Design.css'

function MainPageComp() {

  const [users, setUsers]  = useState([])
  const [sessionNumber,setSessionNumber] = useState(0)
  const [sommeValue,setSommeValue] = useState(0)
  const [sommeValueResult,setSommeValueResult] = useState('')
  

  useEffect(async()=>
  {
      let rows =0;   
      let status = (await axios.get("https://vpn-marketing66.herokuapp.com/interview-test")).data
      let allUsers = status.data
      setSessionNumber(status.session_number)
      let usrs = allUsers.map(user=>{
          
         let numberRows = rows++
        
         let value = user.value
         let firstname = user.first_name
         let arrfN = firstname.split("")
         let indexfn = arrfN.indexOf('-')
         let newArrFn = arrfN.slice(indexfn+1,arrfN.length-1)
         let stringfirstName = newArrFn.join('')
         let firstName = stringfirstName

         let lastname = user.last_name
         let arrlN = lastname.split("")
         let indexln = arrlN.indexOf('-')
         let newArrLn = arrlN.slice(0,indexln)
         let stringlastName= newArrLn.join('')
         let lastName = stringlastName

         let Day = user.date
         let newDate = Day.substr(0, 10).split('-').reverse().join('/')
         
         
         return {Number : numberRows, Value : value, FirstName : firstName, LastName : lastName, Day : newDate}

      })

      setUsers(usrs)

      setSommeValue(usrs.map(elem => elem.Value).reduce((a, b)=>a+b))
  },[])

const sendSum=async()=>
{
  const params = new URLSearchParams()
  params.append('session_number', sessionNumber)
  params.append('result',sommeValue)

  let resp = await axios.post(
    "https://vpn-marketing66.herokuapp.com/interview-test-result",
    params,
    {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}
  )
  let data = resp.data
 
  setSommeValueResult(data)

}
  

  return (
    <div>

  {sommeValue} <br/>

      <input type="button" value="display result"onClick={sendSum}></input> <br/>

      {sommeValueResult}

         <div>

<table className="center">

    <tbody>

    <tr>

     <th> Number</th>
     <th >First Name</th> 
     <th >LastName</th> 
     <th >Value</th>
     <th >Day</th>

    </tr>

    {

users.map((item,index)=>
{
 
return  <tr key ={index} >
                    
       <td >{item.Number}</td>
       <td >{item.FirstName}</td>
       <td >{item.LastName}</td>
       <td >{item.Value}</td>
       <td >{item.Day}</td>

      </tr>

})

}

    </tbody>

    </table>

    </div>

    </div>
  );
}

export default MainPageComp;
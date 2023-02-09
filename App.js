import './App.css';
import React, {useState} from 'react';

//client side. Created a function that receives and accepts data from the server in the form of json. 
function App() {
	//Usestate is an example of a react hook
	const [returnedData, setReturnedData] = useState(["hi there"]);
	const [employee, setEmployee] = useState({EmployeeID: 0, Firstname: '', Lastname: '', Age: 0, Gender: ''})
	
	//destructuring the event, if the event target is an int we need to parse the json into an INT
	const setInput = (e) => {
		const {name, value} = e.target;
		if (name === 'EmployeeID' && name === 'Age') {
			setEmployee(prevState => ({
				...prevState,
				[name]: parseInt(value)
			}));
			return; //return early
		}
		setEmployee(prevState => ({
			...prevState,
			[name]:(value)
		}));
		}
	
	const fetchData = async (url) => {
		console.log(employee);
		const newData = await fetch('/search', {
			method: "POST",
			headers: {
				"content-type": 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: employee.Firstname

			})
		})
		.then(res => res.json());
		console.log(newData)
		setReturnedData(newData[0])
	}

	const createEmployee = async (url) => {
		const newData = await fetch('/create', {
			method: "POST",
			headers: {
				"content-type": 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				//spread operator, intializes fields of employee automatically
				...employee

			})
		})
		.then(res => res.json());
		console.log(newData)
		setReturnedData(newData[0])
	}
  return (
    <div className="App">
		<input type="number" name="EmployeeID" placeholder="EmployeeID" onChange={setInput}></input>
		<input name="Firstname" placeholder="Firstname" onChange={setInput}></input>
		<input name="Lastname" placeholder="Lastname" onChange={setInput}></input>
		<input type="number" name='Age' placeholder="Age" onChange={setInput}></input>
		<input name="Gender" placeholder="Gender" onChange={setInput}></input>
		
		<button onClick={()=>fetchData()}>Search</button>
		<button onClick={()=>createEmployee()}>Create</button>
		<p>EmployeeID: {returnedData.Employee}</p>
		<p>First Name: {returnedData.Firstname}</p>
		<p>EmployeeID: {returnedData.Lastname}</p>
		<p>EmployeeID: {returnedData.Age}</p>
		<p>EmployeeID: {returnedData.Gender}</p>
    </div>
  );
}

export default App;
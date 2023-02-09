const express = require("express")
const cors = require("cors")
const dbOperation = require('./dbfiles/dbOperations')
const Employee = require ('./dbfiles/employee')

const API_Port = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//async because we need to wait for operation to get called
app.post("/search", async(req, res) => {
	console.log("Called API");
	const result  = await dbOperation.getEmployees(req.body.name);
	res.send(result.recordset);
});

app.post("/create", async(req, res) => {
	await dbOperation.createEmployees(req.body);
	const newEmployee = await dbOperation.getEmployees(req.body.Firstname);
	res.send(newEmployee.recordset);
});

let Pam = new Employee(1002,'Pam', 'Beezley', 29, 'Female')


/* dbOperation.createEmployees(Pam); */

app.listen(API_Port, () => console.log("Listening on PORT:" + API_Port));


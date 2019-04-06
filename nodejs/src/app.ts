import express from "express";
import { Worker } from "worker_threads";
let app = express();
let server = require("http").Server(app);
const bodyParser = require("body-parser");

import { echo, get_users } from './controllers/echo';
import { getPortfolioSummary, getHistory, sellActions } from "./controllers/portfolio";
import { getUserGroups } from "./controllers/groups";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/../../angular/dist"));

app.get("/api/echo",echo);
app.get("/api/list_users",get_users);
app.get("/api/portfolio/:nickname",getPortfolioSummary);
app.get("/api/portfolio/history/:nickname",getHistory);
app.get("/api/user/groups:nickname", getUserGroups);

app.post("/api/portfolio/sell",sellActions);
/* CORS THING */
app.options("/api/portfolio/sell",(req,res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendStatus(200);
});

app.get("/*",function(req,res){
	res.sendFile("index.html",{root: __dirname + "/../../angular/dist"});
});



server.listen(process.env.PORT || 9999, function(){
	console.log("Server OK. Listening on: "+(process.env.PORT || 9999));
});

let worker = new Worker(__dirname + "/data/index.js");
worker.on("online",()=>{
	console.log("Data worker started OK");
});
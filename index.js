import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3'; 
import cors from 'cors'
import { totalPhoneBill } from './totalPhoneBill.js';
const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

await db.migrate();

app.post('/api/phonebill/',async(req,res) => {
    const {price_plan,actions} = req.body
    const {sms_price, call_price} = await db.get(`select * from price_plan where plan_name = $1`,[price_plan])
    const total = totalPhoneBill(actions,sms_price,call_price)
    res.status(200).json({total});
})

app.get('/api/price_plans/',async(req,res) => {
    const{price_plans} = req.body
    const allPricePlans= await db.all('select * from price_plan');
    res.status(200).json(allPricePlans);
})

app.post('/api/price_plan/create', async (req,res) => {
    const { name, call_cost, sms_cost } = req.body;
    const total = await db.get(`INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ($1, $2, $3) RETURNING *`, [name, call_cost, sms_cost]);
    res.status(200).json({ message: 'Price plan created successfully'});

})
app.post('/api/price_plan/update',async(req,res) => {
    const { name, call_cost, sms_cost } = req.body;
    const total = await db.run(`UPDATE price_plan SET plan_name=$1, sms_price=$2, call_price=$3 WHERE plan_name =$1`, [name, call_cost, sms_cost]);
    res.status(200).json({ message: 'Price Plan Updated Successfully'});


})
app.post('/api/price_plan/delete', async(req,res) =>{
    const {id} = req.body;
    const total = await db.run(`DELETE FROM price_plan WHERE id =$1`, [id]);
    res.status(200).json({ message: 'Price Plan Delete Successfully'});

})


const PORT = process.env.PORT || 4011;
app.listen(PORT, () => console.log(`Server started ${PORT}`))
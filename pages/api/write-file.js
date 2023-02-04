import fs from 'fs';
import path from 'path';

export default async function (req, res) {
  try{
    // req.setHeader("Content-Type", "application/json");
    const pathName = path.join(__dirname, "../../../../assets/log/chatLog.json");
    fs.readFile(pathName, function (err, data) {
      var json = JSON.parse(data.toString())
      json.push(req.body)
      fs.writeFile(pathName, JSON.stringify(json),(data)=>{})
      return { message: 'log file complie' };
    })
  } catch (err) {
    console.log(err)
  }
  return res.status(200).json({ message: 'log file complie' });
}
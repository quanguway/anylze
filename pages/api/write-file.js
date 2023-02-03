import fs from 'fs';
import path from 'path';

export default async function (req, res) {
  console.log("start api")
  const { message } = req.body;
  console.log(req.body);
  const pathName = path.join(__dirname, "../../../../assets/log/chatLog.json");
  console.log(pathName)
  try{
    // fs.readFile(pathName, function (err, data) {
    //   console.log(data)
    //   var json = JSON.parse(data.toString())
    //   json.push(data)

    //   fs.writeFile(pathName, JSON.stringify(json))
    //   return res.status(200).json({ message: 'log file complie' });
    // })
  } catch (err) {
    console.log("lỗi rùi")
    console.log(err)
  }
  return res.status(200).json({ message: 'log file complie' });
}
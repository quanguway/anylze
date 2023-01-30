import { Configuration, OpenAIApi } from "openai";
import XLSX  from "xlsx";
import multer from 'multer';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log('asdasd');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default async function (req, res) {
  console.log('asd');
  upload.single('file')(req, res, (err) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }

  res.status(200).json({ message: 'File uploaded successfully' });
  });


  // console.log('start');
  // const { file } = req.body;
  // console.log(req.body);
  // const filePath = `./public/uploads/${file.filename}`;
  
  // const workbook = XLSX.readFile(filePath);
  // const sheetName = workbook.SheetNames[0];
  // const sheet = workbook.Sheets[sheetName];
  // const data = XLSX.utils.sheet_to_json(sheet);

  // console.log(data);

  // res.json(data);
}

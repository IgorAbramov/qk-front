import fs from "fs"

import formidable from "formidable"

export const config = { api: { bodyParser: false } }

// const saveFile = async file => {
//    const data = fs.readFileSync(file.path)
//    fs.writeFileSync(`./uploads/${file.name}`, data)
//    await fs.unlinkSync(file.path)
// }

export default function fileUploadHandler(req, res) {
   if (req.method === "POST") {
      // console.log(new formidable.IncomingForm())
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, fields, files) => {
         // await saveFile(files.file)
         console.log(files.file)
         // return res.status(201).send("")
      })
   }
}

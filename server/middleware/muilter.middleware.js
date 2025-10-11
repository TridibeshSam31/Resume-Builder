import multer from "multer"

const storage = multer.diskStorage({})

const upload = multer({storage})

export default upload





/*
The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

There are two options available, destination and filename. They are both functions that determine where the file should be stored.

destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.

Note: You are responsible for creating the directory when providing destination as a function. When passing a string, multer will make sure that the directory is created for you.

filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.

Note: Multer will not append any file extension for you, your function should return a filename complete with a file extension.

Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.

Note that req.body might not have been fully populated yet. It depends on the order that the client transmits fields and files to the server.

For understanding the calling convention used in the callback (needing to pass null as the first param), refer to Node.js error handling






*/ 
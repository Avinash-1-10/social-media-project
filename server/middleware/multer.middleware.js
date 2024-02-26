import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    const fileName = file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    cb(null, fileName);
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

export default upload;

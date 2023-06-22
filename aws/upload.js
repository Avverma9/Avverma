const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const AWS_BUCKET_NAME = "avvermabucket";
const AWS_ACCESS_KEY_ID = "AKIARN4LFJPVG2ZHTDP3";
const AWS_SECRET_ACCESS_KEY = "t7PyulmZmlYQwjqxORzf1IV1vFuedHu3X0ebyv1m";
const AWS_REGION = "ap-south-1"; // Update this to the appropriate region for your S3 bucket
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_BUCKET_NAME,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only images are allowed."));
      }
    },
  }).array("images", 10);
  
  module.exports.upload=upload;
  
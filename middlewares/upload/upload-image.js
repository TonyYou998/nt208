const multer=require("multer");
const mkdirp=require('mkdirp');
const uploadImage=(type)=>{
    const made=mkdirp.sync(`./public/images/${type}`);
    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,`./public/images/${type}`);
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+"_"+file.originalname);
        },
    });
    const upload=multer({
        storage:storage,
        limits:{fileSize:1048576},
        fileFilter:function(req,file,cb){
            const extensionImageList=[".png",".jpg"];
            const extension=file.originalname.slice(-4);

           const check=extensionImageList.includes(extension);
            const fileSize=parseInt(req.header['content-length']);
            if(check){
                cb(null,true);
            }
            else{
                cb(new Error("extension not valid"));
            }
            if(fileSize>1024){
                cb(new Error("maximum file is 1MB"));
            }
        }
    })

    return upload.single(type);
}
module.exports={
    uploadImage,
}
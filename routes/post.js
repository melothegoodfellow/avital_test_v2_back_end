const multer = require("multer");

const { 
    list, 
    create, 
    createCommentOnPost, 
    listPostComments, 
    createLikePost,
    deletePost
} = require("../controllers/post");
const { responseHandler } = require("../middleware/response-handler");
const { storage, fileFilter } = require("../library/file-upload");

const maxFileSize = 1000000;

const postRoutes = require("express").Router();

postRoutes.get("/", async function(req, res){
    const result = await list();
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    });  
});

postRoutes.get("/:id/comment", async function(req, res){
    const result = await listPostComments(req.params.id);
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    });  
});

postRoutes.post("/", async function(req, res){
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: maxFileSize
        }
    })
    .single("image");
    upload(req, res, async (error) => {
        if(error){
            if(error.code === "LIMIT_FILE_SIZE"){
                return responseHandler(res, 413, {
                    data: [],
                    message: "Image upload should be below 1 MB",
                    status: "Post not created",
                    error: []
                });
            }
            console.log("error", error);
        }
        if(req.body.text || req.file){
            const text = (req.body.text) ? req.body.text : '';
            const image = (req.file) ? req.file.filename : '';
            const result = await create(req.userId, text, image);
            responseHandler(res, {
                data: result.data,
                message: result.message,
                status: result.status,
                error: result.error
            }); 
        }
        else
            return responseHandler(res, {
                data: [],
                message: "Missing content",
                status: 204,
                error: []
            });
    });
});

postRoutes.put("/", async function(req, res){
    if(!req.body.postId)
        return responseHandler(res, {
            data: [],
            message: "Missing content",
            status: 204,
            error: []
        });
    const result = await deletePost(req.body.postId);
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    }); 
});

postRoutes.post("/:id/comment", async function(req, res){
    if(!req.body.commentText)
        return responseHandler(res, {
            data: [],
            message: "Missing content",
            status: 204,
            error: []
        });
    const result = await createCommentOnPost(req.userId, req.params.id, req.body.commentText);
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    });    
});

postRoutes.post("/:id/like", async function(req, res){
    const result = await createLikePost(req.userId, req.params.id);
    responseHandler(res, {
        data: result.data,
        message: result.message,
        status: result.status,
        error: result.error
    });
});

module.exports = {
    postRoutes
}
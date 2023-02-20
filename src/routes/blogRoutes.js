  
  import { Router } from "express"
  import  uploadImage  from "./imgConfig/claudinary.js"
  const blogRouter = Router()
  import { getBlogs, postBlog, getSingleBlog, updateBlog, deleteSingleBlog , updateBlogLikes} from "../controler/blogControler.js"
  // import { ValidationBlogSchema } from '../validation/blogValidation.js'
  // import validate from "../validationMiddleware/validate.js"
  import passport from "passport"
  import { getCommentsByBlog, postComments } from "../controler/commentControler.js"
  import CommentValidation from "../validation/commentValidation.js"
  import validate from "../validationMiddleware/validate.js"


  
/**
 * @swagger
 * "/api/v1/blogs":
 *  get:
 *     tags:
 *     - blogs
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  title:
 *                    type: string
 *                  content:
 *                    type: string
 *                  summary:
 *                    type: string
 *                  image:
 *                    type: file
 *       404:
 *         description: bad request
 */
  
  blogRouter.get("/", getBlogs)
  
  /**
 * @swagger
 * "/api/v1/blogs":
 *  post:
 *     tags:
 *     - blogs
 *     summary: Create a Blog
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - summary
 *              - content
 *            properties:
 *              id:
 *                type: number and vowels
 *                default: 23sldf3353453e
 *              title:
 *                type: string
 *                default: football trends
 *              content:
 *                type: string
 *                default: in this world football start to pay much money
 *              summary:
 *                type: string
 *                default: lionel messi have got 500 million dollars
 *              image:
 *                type: file
 *                default: alex.jpg
 *     responses:
 *      200:
 *        description: (blog)
 *      400:
 *        description: Please provide all required details
 *      401:
 *        description: Please provide an image
 *      500:
 *        description: Something went wrong
 *        
 */

  blogRouter.post("",uploadImage.single('image'), postBlog)

 /**
 * @swagger
 * /api/v1/blogs/{id}:
 *   patch:
 *     tags:
 *       - blogs
 *     summary: Update blog by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: The updated content of the blog
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: The updated title of the blog.
 *             content:
 *               type: string
 *               description: The updated content of the blog.
 *             summary: 
 *               type: string
 *               description: the updated blog summary
 *             image:
 *               type: file
 *               description: The updated image of the blog.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The updated title of the blog.
 *                 content:
 *                   type: string
 *                   description: The updated content of the blog.
 *                 summary: 
 *                   type: string
 *                   description: the updated summary of the blog
 *                 image:
 *                   type: file
 *                   description: The updated image of the blog.
 *       404:
 *         description: Not Found
 */
  blogRouter.patch("/:id", updateBlog)

/**
 * @swagger
 * '/api/v1/blogs/{id}':
 *  delete:
 *     tags:
 *     - blogs
 *     summary: Remove blog by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blogs
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      404:
 *        description: Not Found
 */


  blogRouter.delete("/:id",passport.authenticate('jwt', {session: false}),  deleteSingleBlog)

  /**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     tags:
 *       - blogs
 *     summary: Get blog by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The title of the blog.
 *                 content:
 *                   type: string
 *                   description: The content of the blog.
 *                 author:
 *                   type: string
 *                   description: The author of the blog.
 *       404:
 *         description: Not Found
 */


  blogRouter.get("/:id", getSingleBlog)

/**
 * @swagger
 * /api/v1/blogs/{id}/likes:
 *   post:
 *     tags:
 *       - blogs
 *     summary: Update the number of likes for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog to update likes for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: number
 *                   description: The updated number of likes for the blog.
 *       404:
 *         description: Not Found
 */

  blogRouter.post("/:id/likes", updateBlogLikes)


  /**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blog
 *         - name
 *         - comment
 *       properties:
 *         blog:
 *           type: string
 *           description: The unique identifier of the associated blog.
 *         name:
 *           type: string
 *           description: The name of the commenter.
 *         comment:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/blogs/{id}/comments:
 *   post:
 *     tags:
 *       - comments
 *     summary: Create a new comment for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: comment not found 
 */
  blogRouter.post("/:id/comments",validate(CommentValidation), postComments)

  /**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - blog
 *         - name
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the comment.
 *         blog:
 *           type: object
 *           description: The blog associated with the comment.
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier for the blog.
 *             title:
 *               type: string
 *               description: The title of the blog.
 *             content:
 *               type: string
 *               description: The content of the blog.
 *             summary:
 *               type: string
 *               description: The summary of the blog.
 *             image:
 *               type: file
 *               description: The image of the blog.
 *         name:
 *           type: string
 *           description: The name of the commenter.
 *         comment:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/blogs/{id}/comments:
 *   get:
 *     tags:
 *       - comments
 *     summary: Get comments by blog ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier for the blog.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */



  blogRouter.get("/:id/comments", getCommentsByBlog)
  

   
   
  export default blogRouter;
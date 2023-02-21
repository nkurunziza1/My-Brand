  
  
  import { Router } from "express"
  const commentRouter = Router()
  import { getComment, getComments, postComments, deletComment ,getCommentsByBlog} from "../controler/commentControler.js"
  import validate from "../validationMiddleware/validate.js"
  import CommentValidation from "../validation/commentValidation.js"
  import passport from "passport"

  
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
 * /api/v1/comments/{id}:
 *   get:
 *     tags:
 *       - comments
 *     summary: Get comment by ID with associated blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique ID of the comment to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: comment Not Found
 */

  commentRouter.get("/:id", getComment)

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
 *               description: the summary of the blog
 *             
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
 * /api/v1/comments:
 *   get:
 *     tags:
 *       - comments
 *     summary: Get all comments with associated blogs
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


  commentRouter.get("", getComments)

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
 *           description: The text of the comment.
 *
 * /api/v1/comments/{id}:
 *   delete:
 *     tags:
 *       - comments
 *     summary: Delete a comment by ID
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique ID of the comment to delete
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
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */

  commentRouter.delete("/:id",passport.authenticate('jwt', {session: false}), deletComment)


  export default commentRouter; 

   
 
   import { Router } from "express"
   const messageRouter = Router()
   import { getMessage, postMessage, deleteMessage, getSingleMessage } from "../controler/messageControler.js"
   import { ValidationSchema } from '../validation/messagevalidation.js'
   import validate from "../validationMiddleware/validate.js"
   import passport from "passport"

   /**
 * @swagger
 * /api/v1/messages:
 *   get:
 *     tags:
 *       - messages
 *     summary: Get all messages
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the message.
 *                   name:
 *                     type: string
 *                     description: The name of the sender.
 *                   email:
 *                     type: string
 *                     description: The email of the sender.
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *       404:
 *         description: Not Found
 */


   messageRouter.get("", getMessage)

   /**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     tags:
 *       - messages
 *     summary: Create a new message
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the message sender.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the message sender.
 *               message:
 *                 type: string
 *                 description: Content of the message.
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

   messageRouter.post("" ,validate(ValidationSchema), postMessage)

 /**
 * @swagger
 * /api/v1/messages/{id}:
 *   get:
 *     tags:
 *       - messages
 *     summary: Get a single message by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to get
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
 *                 name:
 *                   type: string
 *                   description: The name of the person who sent the message.
 *                 email:
 *                   type: string
 *                   description: The email of the person who sent the message.
 *                 message:
 *                   type: string
 *                   description: The message.
 *       404:
 *         description: Not Found
 */


   messageRouter.get("/:id", getSingleMessage)

   /**
 * @swagger
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the message to delete
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
 *                   description: A message indicating the success of the operation
 *                   example: Delete Successful!
 *       404:
 *         description: Not Found
 */
   messageRouter.delete("/:id",passport.authenticate('jwt', {session: false}), deleteMessage)

  //  passport.authenticate('jwt', {session: false}),
   
   // ,passport.authenticate('jwt', {session: false})

   export default messageRouter;


   
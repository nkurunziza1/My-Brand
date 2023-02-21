
   import express, { json } from "express";
   import { set } from "mongoose";
   import blogRouter from "./routes/blogRoutes.js";
   import messageRouter from "./routes/messageRoutes.js";
   import signupRouter from "./routes/signupRoutes.js";
   import commentRouter from "./routes/commentRouter.js";
//    import likeRouter from "./routes/likeRouter.js";
   import loginRouter from "./routes/loginRoutes.js";
   import bodyParser from "body-parser";
   import passport from "passport";
   import { ExtractJwt, Strategy } from "passport-jwt"
   import { signupSchema } from "./models/signup.js";
   import swaggerDocs from '../swagger.js'
   import cors from "cors"
   
//    import { Swaggiffy } from 'swaggiffy'; 
//    import { registerSchema} from 'swaggiffy';

   


// registerSchema('Blog', schema); 
// registerSchema('Comment', schema, { orm: 'mongoose' }); 
// registerSchema('messages', schema, { orm: 'mongoose' });




   const app = express();
   set('strictQuery', true)
	.connect("mongodb+srv://nkurunziza1:DPW3F9J24i7kfTuP@cluster0.9ithra2.mongodb.net/blogs?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		app.use(cors({}))
		//new Swaggiffy().setupExpress(app).swaggiffy();
		app.use(bodyParser.json({
			limit:"50mb"
		}));
		app.use(express.json())
		const secretKey = 'secretKey'
		const jwtOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// secretOrKey: process.env.JWT_SECRET
			secretOrKey: secretKey
		  };
		  passport.use(new Strategy(jwtOptions, function(jwt_payload, done) {
			// Check if the user exists in the database
			signupSchema.findOne({id: jwt_payload.id}, function(err, user) {
			  if (err) {
				return done(err, false);
			  }
			  if (user) {
				return done(null, user);
			  } else {
				return done(null, false);
			  }
			});
		  }));
        
		app.use("/api/v1/blogs", blogRouter);
	    app.use("/api/v1/messages", messageRouter);
        app.use("/api/v1/users", signupRouter)
		app.use("/api/v1/comments", commentRouter)
		app.use("/api/v1/auth/login", loginRouter)

		// app.use("/api/likes", likeRouter)
		// app.use("/api/likes", likeRouter)
      const port = 5000
		app.listen(port, () =>{
			 console.log("Server has started!");
		});
		swaggerDocs(app, port)
	})
	
	export default app
	

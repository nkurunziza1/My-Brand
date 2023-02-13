
  
  import { Blog } from '../models/Blog.js' // new
  
 

  const getBlogs = async (req, res)=>{
  const blogs = await Blog.find().sort({createdAt:-1})
  
  res.status(200).json({blog:blogs})
  
  }

  const postBlog = async (req, res) => {
    try {
    if (!req.body.title || !req.body.content || !req.body.summary) {
    res.status(400).json({ message: "Please provide all required details" });
    } else if (!req.file) {
    res.status(400).json({ message: "Please provide an image" });
    } else {
    const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    image: req.file.path,
   });

   await blog.save();
   res.status(200).json(blog);
  
   }
   } catch (error) {
   res.status(500).json({error: "Something went wrong" });
   }
  
   };

  const updateBlogLikes = async (req, res) => {
    const like = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } },
      { upsert: true, new: true }
    );
    
    res.json({ likes: like.likes });
    }
 
  const getSingleBlog = async(req, res) => {
    try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
    res.status(404).json({message:"Post not found"});
    } else {
    res.send(blog);
    }
    } catch (error) {
    res.status(500).json({message:"something went wrong!"});
    }
    };
  
    // const updateBlogLikes = async (req, res)=>{
    //   const blogLike = await Blog.findById({_id: req.params.id})
    //   // if(blogLike){

    //   blogLike.likes +1

    //   await blogLike.save()

    //   res.json({likes: blogLike.likes})
      
    //   // }else{/
    //     // res.status(404).json("blog not found")
    //   // }
    // }
    const updateBlog = async (req, res) => {
    try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
        return res.status(404).json({message:"Blog not found!"});
    }

    if (req.body.title) {
        blog.title = req.body.title;
    }

    if (req.body.content) {
        blog.content = req.body.content;
    }

    if (req.body.summary) {
        blog.summary = req.body.summary;
    }

    if (req.body.image) {
        blog.image = req.body.image;
    }

    await blog.save();
    res.json(blog);
    } catch (error) {
    res.status(500).json({error:"Something went wrong!"});
    }
    }

    const deleteSingleBlog = async (req, res) => {
    try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
    res.status(404).send("Post not found");
    } else {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Blog deleted" });
    }
    } catch (error) {
    res.status(400).json({error:"Something went wrong!"});
    }
    };
    
    
    
    

    export {getBlogs, postBlog, getSingleBlog, updateBlog, deleteSingleBlog,updateBlogLikes}
   
  // export const GetBlogs = getBlogs
  // export const PostBlog = postBlog
  // export const GetSingleBlog = getSingleBlog
  // export const UpdateBlog = updateblog
  // export const DeleteSingleBlog = deleteSingleBlog  

  
  import { Blog } from '../models/Blog.js' // new
  import { commentSchema } from '../models/comment.js'
  

  const getBlogs = async (req, res)=>{

  const blogs = Blog.aggregate([
  {
    $lookup: {
      from: commentSchema.collection.name,
      localField: '_id',
      foreignField: 'blog',
      as: 'comments'
    }
  },
  {
    $project: {
      title: '$title',
      content: '$content',
      likes: "$likes",
      summary: '$summary',
      image: '$image',
      createdAt: '$createdAt',
      commentCount: { $size: '$comments' }
    }
  }
]).exec((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json({blog: result});
    }
  });
}

  const postBlog = async (req, res) => {
    try {
    if (!req.body.title || !req.body.content || !req.body.summary){
    res.status(400).json({ message: "Please provide all required details" });
    } else if (!req.file) {
    res.status(400).json({ message: "Please provide an image" });
    } else {
    const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    image: req.file.path,
    // createdAt: {
    //   type: Date,
    //   default: Date.now
    //  }
    
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
    res.json(blog);
    }
    } catch (error) {
    res.status(404).json({message:"Post not found"});
    }
    };
  
    const updateBlog = async (req, res) => {
    try {
    const blog = await Blog.findOne({ _id: req.params.id });
    console.log(blog)
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
    res.status(404).json({message:"Blog not found!"});
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
    res.status(404).json({message:"Post not found"});
    }
    };
    
    
    
    

    export {getBlogs, postBlog, getSingleBlog, updateBlog, deleteSingleBlog,updateBlogLikes}
   
  // export const GetBlogs = getBlogs
  // export const PostBlog = postBlog
  // export const GetSingleBlog = getSingleBlog
  // export const UpdateBlog = updateblog
  // export const DeleteSingleBlog = deleteSingleBlog  
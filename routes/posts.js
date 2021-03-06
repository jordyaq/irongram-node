const router = require('express').Router()
const Post = require('../models/Post')
const uploadCloud = require('../helpers/cloudinary')


router.get('/', (req, res, next)=>{
  Post.find().sort('-created_at').populate('user')
    .then(posts=>{
      res.render('posts/newsfeed',{posts})
    }).catch(e=>{
      res.redirect('/')
    })
})

router.post('/', uploadCloud.single('image'),(req, res, next)=>{
  req.body['user'] = req.user._id
  if(req.file)req.body['imageURL'] = req.file.url
  Post.create(req.body)
    .then(post=>{
      res.redirect('/posts')
    }).catch(e=>{
      res.redirect('/')
    })
})

module.exports = router
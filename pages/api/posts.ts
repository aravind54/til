import connectDB from '../../middleware/connectDb'
import Posts from '../../models/postModel'

const handler = async (req: any, res: any) => {
  try {
    if (req.method === 'POST') {
      const { content, user } = req.body
      const post = new Posts({
        content,
        user,
      })
      const userCreated = await post.save()
      res.status(200).send(userCreated)
    } else if (req.method === 'GET') {
      const posts = await Posts.find({})
      res.status(200).send({ data: posts })
    }
  } catch (err) {
    console.error(err)
    res.status(400).send('Error with api' + err)
  }
}

export default connectDB(handler)

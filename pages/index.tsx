import Head from 'next/head'

const Index = (props: any) => {
  const posts = props?.data?.data?.map((post: any) => {
    return {
      content: post?.content,
      user: post?.user,
      data: post?.data,
    }
  })
  return (
    <>
      <Head>
        <title>TIL</title>
        <meta name="description" content="Today I Learned" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <div className="w-1/2 mx-auto mt-16">
          {posts?.map((post: any) => (
            <div
              key={post?._id}
              className="w-full p-4 rounded-md mt-2"
              style={{
                border: '1px solid #e0e0e0',
              }}
            >
              <div>{post?.content}</div>
              <div className="w-fit ml-auto">{post?.user}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req }: any) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const res = await fetch(`${protocol}://${req.headers.host}/api/posts`)
    const data = await res.json()
    return {
      props: {
        data,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export default Index

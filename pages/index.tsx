import Head from 'next/head'

const Index = () => {
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
          <div
            className="w-full p-4 rounded-md mt-2"
            style={{
              border: '1px solid #e0e0e0',
            }}
          >
            <div>Hello, This is a sample til</div>
            <div className="w-fit ml-auto">Aravind</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

import * as React from 'react'
// components
import PaginationContainer from 'components/PaginationContainer/PaginationContainer'
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer'

const Index = ({ data: { data, totalCount } }: any) => {
  const posts = data?.map((post: any) => {
    return {
      content: post?.content,
      user: post?.user,
    }
  })

  const [items, setItems] = React.useState(posts || [])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const hasNextPage = totalCount > items?.length

  const loadNextPage = async () => {
    try {
      setIsLoading(true)
      const { origin } = window.location
      const res = await fetch(
        `${origin}/api/hosts?page=${currentPage + 1}&limit=${20}`
      )
      const data = await res?.json()

      const posts = data?.data?.map((post: any) => ({
        content: post?.content,
        user: post?.user,
      }))
      setItems([...items, ...posts])
      setCurrentPage(currentPage + 1)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  console.log(items)
  console.log(height)
  console.log(width)

  return (
    <div className="">
      <div className="flex">
        <div className="flex-auto h-screen">
          <ReactVirtualizedAutoSizer>
            {({ width: autoSizeWidth, height: autoSizeHeight }) => {
              setWidth(autoSizeWidth)
              setHeight(autoSizeHeight)
              return (
                <div className="w-1/2 mx-auto mt-16">
                  <PaginationContainer
                    hasNextPage={hasNextPage}
                    items={items}
                    loadNextPage={loadNextPage}
                    isNextPageLoading={isLoading}
                    width={width}
                    height={height}
                    totalCount={totalCount}
                  />
                </div>
              )
            }}
          </ReactVirtualizedAutoSizer>
        </div>
      </div>
    </div>
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

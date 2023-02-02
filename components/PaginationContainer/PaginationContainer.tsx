import * as React from 'react'

import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import Posts from '../Posts/Posts'

interface Props {
  hasNextPage: boolean
  items: any
  width: number
  height: number
  loadNextPage: () => void
  isNextPageLoading: boolean
  totalCount: number
}

interface ItemProps {
  index: number
  style: any
}

const PaginationContainer: React.FC<Props> = ({
  hasNextPage,
  items,
  loadNextPage,
  isNextPageLoading,
  width,
  height,
  totalCount,
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  const isItemLoaded = (index: number) => !hasNextPage || index < items.length

  const Item: React.FC<ItemProps> = ({ index, style }) => {
    let content
    if (!isItemLoaded(index)) {
      content = 'Loading...'
    } else {
      content = items[index]
    }

    return (
      <div>
        <Posts
          id={content?._id}
          content={content?.content}
          user={content?.user}
        />
      </div>
    )
  }
  console.log(height)
  console.log(width)

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
          itemSize={totalCount}
          height={height}
          width={width}
        >
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}

export default PaginationContainer

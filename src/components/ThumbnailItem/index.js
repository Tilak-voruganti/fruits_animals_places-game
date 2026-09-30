import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, checkMatchingImage} = props
  const {id, thumbnailUrl} = imageDetails

  const onClickThumbnail = () => {
    checkMatchingImage(id)
  }

  return (
    <li className="thumbnail-item">
      <button
        type="button"
        className="thumbnail-btn"
        onClick={onClickThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default ThumbnailItem

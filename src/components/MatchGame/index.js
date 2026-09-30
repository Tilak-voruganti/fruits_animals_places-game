import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'
import './index.css'

class MatchGame extends Component {
  state = {
    score: 0,
    timeInSeconds: 60,
    activeTabId: 'FRUIT',
    activeImageId: '',
    isGameInProgress: true,
  }

  componentDidMount() {
    const {imagesList} = this.props
    this.setState({activeImageId: imagesList[0].id})
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timeInSeconds} = this.state
    if (timeInSeconds > 0) {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds - 1}))
    } else {
      this.clearTimer()
      this.setState({isGameInProgress: false})
    }
  }

  clickTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  checkMatchingImage = id => {
    const {activeImageId} = this.state
    const {imagesList} = this.props

    if (id === activeImageId) {
      const newImageIndex = Math.floor(Math.random() * imagesList.length)
      const newImageId = imagesList[newImageIndex].id
      this.setState(prevState => ({
        score: prevState.score + 1,
        activeImageId: newImageId,
      }))
    } else {
      this.clearTimer()
      this.setState({isGameInProgress: false})
    }
  }

  resetGame = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      score: 0,
      timeInSeconds: 60,
      activeTabId: tabsList[0].tabId,
      activeImageId: imagesList[0].id,
      isGameInProgress: true,
    })
    this.startTimer()
  }

  renderGameView = () => {
    const {activeTabId, activeImageId} = this.state
    const {tabsList, imagesList} = this.props

    const activeImageObject = imagesList.find(each => each.id === activeImageId)
    const activeImageUrl = activeImageObject ? activeImageObject.imageUrl : ''

    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )

    return (
      <div className="game-body-container">
        <img src={activeImageUrl} alt="match" className="match-image" />
        <ul className="tabs-container">
          {tabsList.map(eachTab => (
            <TabItem
              key={eachTab.tabId}
              tabDetails={eachTab}
              clickTab={this.clickTab}
              isActive={activeTabId === eachTab.tabId}
            />
          ))}
        </ul>
        <ul className="thumbnails-container">
          {filteredImages.map(eachImage => (
            <ThumbnailItem
              key={eachImage.id}
              imageDetails={eachImage}
              checkMatchingImage={this.checkMatchingImage}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderScoreCardView = () => {
    const {score} = this.state

    return (
      <div className="score-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-img"
        />
        <p className="your-score-label">YOUR SCORE</p>
        <p className="score-text">{score}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.resetGame}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-icon"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {score, timeInSeconds, isGameInProgress} = this.state

    return (
      <div className="app-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <ul className="nav-scores-container">
            <li className="score-container">
              <p className="score-label">
                Score: <span className="score-value">{score}</span>
              </p>
            </li>
            <li className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-icon"
              />
              <p className="timer-text">{timeInSeconds} sec</p>
            </li>
          </ul>
        </nav>
        <div className="game-container">
          {isGameInProgress
            ? this.renderGameView()
            : this.renderScoreCardView()}
        </div>
      </div>
    )
  }
}

export default MatchGame

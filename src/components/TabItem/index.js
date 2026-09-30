import './index.css'

const TabItem = props => {
  const {tabDetails, clickTab, isActive} = props
  const {tabId, displayText} = tabDetails

  const activeTabBtnClassName = isActive ? 'tab-btn active-tab-btn' : 'tab-btn'

  const onClickTab = () => {
    clickTab(tabId)
  }

  return (
    <li className="tab-item">
      <button
        type="button"
        className={activeTabBtnClassName}
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem

import TTLoginForm from "./login-form"
import './index.scss'

export default () => {
  return (
    <div className="tt-login-page">
      <div className="top-space"></div>
      <div className="content">
        <div className="left-space"></div>
        <TTLoginForm />
        <div className="right-space"></div>
      </div>
      <div className="bottom-space"></div>
    </div>
  )
}
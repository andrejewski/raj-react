const { runtime } = require('raj')

exports.program = function reactProgram (Component, createApp) {
  return class RajProgram extends Component {
    componentDidMount () {
      const app = createApp(this.props)
      this._view = app.view
      this._killProgram = runtime({
        ...app,
        view: (state, dispatch) => {
          this._dispatch = dispatch
          this.setState(() => ({ state }))
        }
      })
    }

    componentWillUnmount () {
      if (this._killProgram) {
        this._killProgram()
        this._killProgram = undefined
      }
    }

    render () {
      return this._view ? this._view(this.state.state, this._dispatch) : null
    }
  }
}

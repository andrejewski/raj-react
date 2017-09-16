const {program} = require('raj/runtime')

function reactProgram (Component, createApp) {
  return class RajProgram extends Component {
    constructor (props) {
      super(props)
      this.makeProgram(props, true)
    }

    makeProgram (props, initial) {
      this.killProgram()
      const {view, ...app} = createApp(props)
      this._view = view
      this._killProgram = program({
        ...app,
        view: (state, dispatch) => {
          this._dispatch = dispatch
          if (initial) {
            this.state = {state}
            initial = false
          } else {
            this.setState(() => ({state}))
          }
        }
      })
    }

    killProgram () {
      if (this._killProgram) {
        this._killProgram()
        this._killProgram = undefined
      }
    }

    componentWillReceiveProps (newProps) {
      if (newProps !== this.props) {
        this.makeProgram(newProps, false)
      }
    }

    componentWillUnmount () {
      this.killProgram()
    }

    render () {
      return this._view(this.state.state, this._dispatch)
    }
  }
}

module.exports = {program: reactProgram}

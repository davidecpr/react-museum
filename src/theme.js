import { createMuiTheme } from '@material-ui/core/styles'

const config = {
    themeName: 'Example MobX React',
    palette: {
        primary: {
            light: '#fff350',
            main: '#ffc107',
            dark: '#c79100',
            contrastText: '#fff'
        }
    }
}

const theme = createMuiTheme(config)
export default theme

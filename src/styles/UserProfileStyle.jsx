const customTheme = theme => ({
    paper: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(4)
    },
    avatar: {
        width: '150px',
        height: '150px',
    },
    edit: {
        margin: theme.spacing(3,0,0),
        padding: 10
    },
    userMuseum: {
        marginTop: 30,
        display: 'flex',
        alignItems: 'left',
        flexDirection: 'column'
    }
});

export default customTheme;
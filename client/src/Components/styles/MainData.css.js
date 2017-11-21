import colors from './color.css';

export default {
     currentTempStyle: {
        padding: 8,
        fontSize: 60,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: colors.mainColor
     },
     rangeTempStyle: {
        position: 'relative',
        paddingTop: 14,
        fontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: colors.subColor
        // background: '#DCE775'
     },
     maxTempStyle: {
        height: 26
     },
     imgContainerStyle: {
        flexGrow: 1
     },
     imgStyle: {
        margin: 'auto',
        width: 60,
        height: 60,
        paddingTop: 14,
        paddingBottom: 10,
        // background: '#DCE775'
     },
     ditailStyle: {
        marginLeft: 80
     },
     flexContainerStyle: {
        display: 'flex'
     },
     arrowStyle: {
        top: 7
     }
}
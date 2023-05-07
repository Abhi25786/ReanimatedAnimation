import { StyleSheet } from 'react-native'

// export const styles = StyleSheet.create({

// })
export default styleFun = (maxHeight) => {
    const style = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: 'red'
        },
        cardHeight: {
            height: maxHeight,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
    return style
}
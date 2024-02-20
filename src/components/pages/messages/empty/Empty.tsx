import { View, Text } from 'react-native'
import React from 'react'
import { Circle } from '@/components'

const Empty: React.FC = () => {
    return (
        <View>
            <Text>Empty</Text>
            <Circle />
        </View>
    )
}

export default Empty
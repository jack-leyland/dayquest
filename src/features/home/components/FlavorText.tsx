import { View, StyleSheet } from "react-native"
import { ThonburiBold } from "../../../common/components/StyledText"

export type FlavourTextProps = {
    lastFiveScores: Array<number> | null
}

const pickText = (scores: FlavourTextProps["lastFiveScores"]): string => {
    if (!scores) return "Let's get started!"
    let positiveCount = 0
    for (let i = 0; i <= scores.length; i++){
        if (scores[i] > 0) positiveCount++
    }
    if (positiveCount === 5) {
        return "You're on a roll!"
    } else if (positiveCount > 0 && positiveCount < 5){
        return "Looking good!"
    } else {
        return "Let's get back on track!"
    }
}


export default function FlavorText({lastFiveScores}:FlavourTextProps){
    const text = pickText(lastFiveScores)
    return (
        <ThonburiBold style={{fontSize: 30}}>{text}</ThonburiBold>
    )
}
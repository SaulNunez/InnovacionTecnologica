import { AsyncStorage } from "react-native";

export async function setDifficulty(level) {
    try {
        await AsyncStorage.setItem('points', level);
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateStatistics(maxQuestionsAnswered) {
    try {
        await AsyncStorage.setItem('maxQuestionsAnswered', maxQuestionsAnswered);
    } catch (error) {
        console.error(error.message);
    }
}

export default async function getDifficulty() {
    let points = 0;
    try {
        points = await AsyncStorage.getItem('points') || 0;
    } catch (error) {
        console.error(error.message);
    }
    return points;
}

export async function getStatistics() {
    let maxQuestionsAnswered = 0;
    try {
        maxQuestionsAnswered = await AsyncStorage.getItem('maxQuestionsAnswered') || 0;
    } catch (error) {
        console.error(error.message);
    }
    return maxQuestionsAnswered;

}

export async function purgeCurrentData() {
    try {
        await AsyncStorage.removeItem('points');
        await AsyncStorage.removeItem('maxQuestionsAnswered');
    } catch (error) {
        console.error(error.message);
    }

}

export async function updateVolume({ music, fx }) {
    try {
        await AsyncStorage.setItem('music', music);
        await AsyncStorage.setItem('fx', fx);
    } catch (error) {
        console.error(error.message);
    }
}

export async function getVolume() {
    let fx = 0;
    let music = 0;
    try {
        fx = await AsyncStorage.getItem('volume') || 0;
        music = await AsyncStorage.getItem('fx') || 0;
    } catch (error) {
        console.error(error.message);
    }
    return { fx, music };
}
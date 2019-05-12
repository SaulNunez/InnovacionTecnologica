import { AsyncStorage } from "react-native";

export async function setDifficulty(level){
    await AsyncStorage.setItem('points', level);
}

export async function updateStatistics(maxQuestionsAnswered){
    await AsyncStorage.setItem('maxQuestionsAnswered', maxQuestionsAnswered);
}

export default async function getDifficulty(){
    return await AsyncStorage.getItem('points') || 0;
}

export async function getStatistics(){
    return await AsyncStorage.getItem('maxQuestionsAnswered') || 0;
}

export async function purgeCurrentData(){
    await AsyncStorage.removeItem('points');
}

export async function setDifficulty(level){
    await AsyncStorage.setItem('points', level);
}

export async function updateStatistics(questions){

}

export default async function getDifficulty(){
    return await AsyncStorage.getItem('points') || 0;
}

export async function purgeCurrentData(){
    await AsyncStorage.removeItem('points');
}

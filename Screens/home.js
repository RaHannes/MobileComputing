import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, pressable, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '../config';
import {FronAwsome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
 
const home = (() => {

    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState(['']);
    const navigation = useNavigation();

    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                        todos.push({
                            id: doc.id,
                            heading,
                        })
                    })
                    setTodos(todos)
            }
        )
}, [])

const deleteTodo = (todos) => {
    todoRef.doc(todos.id)
    .delete()
    .then(() => {
        alert("Deleted Successfully")
    })
    .catch(error => {
        alert (error);
    })
}

const addTodo = () => {
    if (addData && addData.length>0){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            heading: addData,
            createdAt: timestamp
        };
        todoRef.add(data)
        .then(() => {
            setAddData('');
            Keyboard.dismiss();
        })
        .catch((error) =>{
            alert(error);
        })
    }
}

return (
    <View style={{flex:1}}>
        <View style={StyleSheet.formcontainer}>
            <TextInput style={StyleSheet.input}
            pleaceholder='Add A New Todo'
            placeholderTextColor='#aaaaaa'
            onChangeText={(heading) => setAddData(heading)}
            value={addData}
            underlineCOlorAndroid='transparent'
            autoCapitalize='none'
            />
            <TouchableOpacity style={StyleSheet.button}
            onPress={addTodo}>
                <Text style={StyleSheet.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
        <FlatList data={todos}
        numColumns={1}
        renderItem={({item}) => (
            <View>
                <Pressable style={StyleSheet.container}
                onPress={() => navigation.navigate('Detail', {item})}
                >
                    <FontAwsome
                        name='trash-o'
                        colors='red'
                        onPress={() => deleteTodo(item)}
                        style={StyleSheet.todoIcon}
                        />
                        <View style={StyleSheet.innerContainer}>
                            <Text style={StyleSheet.itemHeading}>
                                {item.heading[0].toupperCase() + item.heading.slice(1)}
                            </Text>
                        </View>
                                    
                </Pressable>
            </View>
        )}
        />
    </View>
    )
}

)
export default home;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        fleyDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formCOntainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
    },
    inout:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button: {
        height:47,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'white',
        fontSize:20
    },
    todoIcon: {
        marginTop:5,
        fontSize:20,
        marginLeft:14
    }
})
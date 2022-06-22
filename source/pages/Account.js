import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Account() {

    const options = [{
        icon: <MaterialCommunityIcons name='account-outline' size={24} />,
        title: 'Profile',
    }, {
        icon: <Icon name='list' size={24} />,
        title: 'My Rides',
    }, {
        icon: <Icon name='settings-outline' size={24} />,
        title: 'Settings',
    }, {
        icon: <MaterialCommunityIcons name='head-lightbulb-outline' size={24} />,
        title: 'Keep in Mind',
    }, {
        icon: <Icon name='chatbox-ellipses-outline' size={24} />,
        title: 'Contact Us',
    }]
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainDiv}>
                <Text style={styles.nameTitle}>
                    Welcome, User
                </Text>
                <View style={styles.wallet}>
                    <Text style={{ fontSize: 26 }}>Your Wallet</Text>
                    <Text style={{ fontSize: 22 }}>LBP 200,000</Text>
                    <TouchableOpacity style={styles.withdrawButton}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Withdraw Money</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.options}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity style={styles.optionsItem}>
                                    {item.icon}
                                    <Text style={{ color: 'black', fontSize: 18, marginLeft: 10 }}>{item.title}</Text>
                                </TouchableOpacity>
                                {/*<View style={{ position: 'absolute', bottom: 0, left: 20, right: 20, borderBottomWidth: 1, borderBottomColor: 'rgb(0, 125, 200)' }} />*/}
                            </View>
                        }
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
    },
    nameTitle: {
        fontSize: 28,
        margin: 20,
        marginTop: 40,
    },
    wallet: {
        backgroundColor: 'white',
        width: '90%',
        height: 170,
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 5,
        padding: 15,
        justifyContent: "space-between"
    },
    withdrawButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgb(0, 125, 200)',
        padding: 10,
        borderRadius: 5
    },
    options: {
        flex: 1,
        width: '90%',
        backgroundColor: 'white',
        elevation: 5,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20
    },
    optionsItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    }
})
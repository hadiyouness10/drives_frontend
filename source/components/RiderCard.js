import React from 'react';
import { View, StyleSheet, Dimensions,Text, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";


const RiderCard = props => {


let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

  return (
     <View
        style={[
         styles.cardContainer,
        { backgroundColor: props.background
            ? props.background
            : "#fff",
          width: screenWidth - scale(20),
        }
        ]}
      >
        <View
          style={{
            height: verticalScale(95),
            marginRight: scale(10)
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            {props.profile ? (
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  borderBottomLeftRadius: 12,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={props.profile}
                  style={{
                    width: scale(props.width || 50),
                    height: scale(props.height || 50)
                  }}
                  borderRadius={50}
                />
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: "transparent",
                flex: props.profile ? 2.5 : 5,
                justifyContent: "center",
                marginLeft: 3
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: scale(15),
                  margin: 3
                }}
              >
                {props.title}
              </Text>
              {props.background ? null : (
                <Text
                  style={{ color: "#adb3bf", fontSize: scale(11), margin: 3 }}
                >
                  {props.subTitle}
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                borderBottomRightRadius: 12,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              {props.icon ? (
                <Icon
                  name={props.icon}
                  color={props.iconColor}
                  size={scale(20)}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
 
  cardContainer:{
        margin: scale(10),
        alignSelf: "center",
        borderRadius: 12,
        elevation: 2,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOpacity: 0.16,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 0
        },
        height:120

  }
});



export default RiderCard;
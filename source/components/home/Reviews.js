import { useCreateCommentMutation } from "api/mutations";
import { useGetReviewsQuery, useUserPhotoQuery } from "api/queries";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthenticationContext } from "routes/authentication-context";
import { Comments } from "./Comments";
import UserAvatar from "react-native-user-avatar";

const ReviewPhoto = ({ studentId, firstName, lastName }) => {
  const { data: photo } = useUserPhotoQuery(studentId);
  return (
    <UserAvatar
      size={50}
      name={`${firstName} ${lastName}`}
      component={
        photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
        ) : undefined
      }
    />
  );
};
export const Reviews = ({ studentId }) => {
  const { data: reviews } = useGetReviewsQuery(studentId);
  const [newComments, setnewComments] = useState(
    Array(reviews?.length).fill("")
  );
  const { userId } = useContext(AuthenticationContext);

  const { mutate: createComment } = useCreateCommentMutation();

  const updateComment = (index, value, reviewId) => {
    let comments = [...newComments];
    comments[index] = value;
    // setNewUpdate(newUpdate);
    setnewComments(comments);
  };
  const sendComment = (index, reviewId) => {
    let newComment = {
      studentId: userId,
      reviewId: reviews[index].reviewId,
      comment: newComments[index],
    };
    createComment(newComment, reviewId);
    let comments = [...newComments];
    comments[index] = "";
    setnewComments(comments);
  };

  return (
    <View style={{ marginTop: 30, flexGrow: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "500" }}>
        Reviews & Comments
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <View>
          {reviews?.map((review, index) => {
            return (
              <View key={review.ID + " " + index}>
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ReviewPhoto
                    studentId={review.studentID}
                    firstName={review.firstName}
                    lastName={review.lastName}
                  />
                  <View>
                    <Text
                      style={{ fontSize: 18, fontWeight: "400", marginLeft: 5 }}
                    >
                      {review.firstName} {review.lastName}
                    </Text>
                    <Rating
                      type="star"
                      startingValue={review.rating}
                      ratingCount={5}
                      imageSize={20}
                      readonly={true}
                    />
                  </View>
                </View>
                <Text style={{ marginLeft: 10, marginTop: 10 }}>
                  {review.description}
                </Text>
                <View
                  style={{
                    marginBottom: 20,
                    marginLeft: 20,
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: 1,
                      backgroundColor: "#909090",
                    }}
                  ></View>
                  <View>
                    <View>
                      <Comments reviewId={review.reviewId} />
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        key={"FirstName"}
                        style={{ height: 30, width: 200, color: "#909090" }}
                        placeholder={"Write a comment"}
                        value={newComments[index]}
                        onChangeText={(value) =>
                          updateComment(index, value, review.ID)
                        }
                      />
                      <TouchableOpacity onPress={() => sendComment(index)}>
                        <Icon
                          name={"send"}
                          size={20}
                          color={"green"}
                          style={{
                            marginBottom: 10,
                            marginLeft: 10,
                            marginTop: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    color: "#092436",
    fontWeight: 600,
    marginBottom: 200,
  },
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 10,
    borderBottomWidth: 0.4,
    width: "95%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  drawInnerLine: {
    borderBottomColor: "gray",
    marginTop: 10,
    borderBottomWidth: 0.4,
    width: "80%",
    marginLeft: "10%",
    marginRight: "5%",
  },
});

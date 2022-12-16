import { useGetCommentsQuery, useUserPhotoQuery } from "api/queries";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";

const CommentPhoto = ({ studentId, firstName, lastName }) => {
  const { data: photo } = useUserPhotoQuery(studentId);
  return (
    <UserAvatar
      size={30}
      name={`${firstName} ${lastName}`}
      component={
        photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
          />
        ) : undefined
      }
    />
  );
};
export const Comments = ({ reviewId }) => {
  const { data } = useGetCommentsQuery(reviewId);
  return (
    <View>
      {data?.map((comment) => {
        return (
          <View key={comment.commentId}>
            <View
              style={{
                marginLeft: 10,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CommentPhoto
                studentId={comment.studentID}
                firstName={comment.firstName}
                lastName={comment.lastName}
              />
              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 5 }}>
                {comment.firstName} {comment.lastName}{" "}
              </Text>
            </View>
            <Text style={{ marginLeft: 10, marginTop: 10 }}>
              {comment.comment}
            </Text>
          </View>
        );
      })}
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

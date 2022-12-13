import { useGetCommentsQuery } from "api/queries/reviews/comment-query";
import { useGetReviewsQuery } from "api/queries/reviews/review-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
              <Image
                style={{ width: 30, height: 30, borderRadius: 25 }}
                source={{ uri: "https://picsum.photos/200" }}
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

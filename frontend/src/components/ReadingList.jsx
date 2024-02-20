import React from "react";
import ReadingListItem from "./ReadingListItem";

const ReadingList = ({ readings }) => {
  return readings.map((reading) => {
    return <ReadingListItem key={reading._id} reading={reading} />;
  });
};

export default ReadingList;

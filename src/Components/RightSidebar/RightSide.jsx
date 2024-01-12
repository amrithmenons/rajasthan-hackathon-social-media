import React, { useState, useContext } from "react";
import waterslide from "../../assets/images/waterslide.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import remove from "../../assets/images/delete.png";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;

  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-60 rounded-md" src={waterslide} alt="nature1" />
      </div>
      <div className="mx-2 mt-10">
        <div className="scrollable-content max-h-48 overflow-y-auto">
          <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
            {/* Your information about Rajasthan Police achievements */}
            <b>Official Website:</b> The official website of the Rajasthan Police may provide press releases, updates, and information about recent achievements. Visit the official website or their social media channels.
            <li>
              <b>News Outlets:</b> Local news outlets and newspapers in Rajasthan often cover significant achievements, initiatives, and events related to the police department.
            </li>
            <li>
              <b>Government Announcements:</b> Check official government announcements and press releases related to the Rajasthan Police.
            </li>
            <li>
              <b>Police Department Publications:</b> Some police departments release periodic publications or reports summarizing their achievements and activities. These documents may be available on the official website.
            </li>
            <li>
              <b>Community Engagement Platforms:</b> Police departments sometimes engage with the community through various platforms. Check social media accounts or community engagement platforms for updates.
            </li>
          </p>
        </div>
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends:
        </p>
        <div className="scrollable-content max-h-48 overflow-y-auto">
          <input
            className="border-0 outline-none mt-4"
            name="input"
            value={input}
            type="text"
            placeholder="Search friends"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          {friendList?.length > 0 ? (
            searchFriends(friendList)?.map((friend) => {
              return (
                <div
                  className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
                  key={friend.id}
                >
                  <Link to={`/profile/${friend.id}`}>
                    <div className="flex items-center my-2 cursor-pointer">
                      <div className="flex items-center">
                        <Avatar
                          size="sm"
                          variant="circular"
                          src={friend?.image || avatar}
                          alt="avatar"
                        ></Avatar>
                        <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                          {friend.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="mr-4">
                    <img
                      onClick={() =>
                        removeFriend(friend.id, friend.name, friend.image)
                      }
                      className="cursor-pointer"
                      src={remove}
                      alt="deleteFriend"
                    ></img>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Add friends to check their profile
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;

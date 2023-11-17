import { firestore } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  where,
  // setDoc,
  query,
  // deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getCurrentUserDetails } from "../User/userSlice";
import { getUserTasks } from "../Task/taskSlice";

const usersRef = collection(firestore, "users");
const taskRef = collection(firestore, "tasks");

export const postUserData = (object) => {
  addDoc(usersRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (dispatch) => {
  onSnapshot(usersRef, (response) => {
    dispatch(
      getCurrentUserDetails(
        response.docs
          .map((docs) => {
            return { ...docs.data(), id: docs.id };
          })
          .filter((item) => {
            return item.email === localStorage.getItem("userEmail");
          })[0]
      )
    );
  });
};

export const postTaskDetails = (object) => {
  addDoc(taskRef, object)
    .then(() => {
      toast.success("Task has updated successfully");
    })
    .catch(() => {
      toast.error("Error in uploading");
    });
};

export const getUserTasksAPI = (id, dispatch) => {
  try {
    if (id) {
      const q = query(
        taskRef,
        where("userId", "==", id),
        orderBy("updatedAt", "desc")
      );
      onSnapshot(q, (response) => {
        dispatch(
          getUserTasks(
            response.docs.map((docs) => {
              return { ...docs.data(), id: docs.id };
            })
          )
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (id, tabs, updatedAt) => {
  let docToUpdate = doc(taskRef, id);
  try {
    updateDoc(docToUpdate, { tabs, updatedAt });
  } catch (err) {
    console.log(err);
  }
};

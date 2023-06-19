import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";
import { createNotify } from "./notifyAction";

export const MESSAGE_TYPES = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATIONS: "GET_CONVERSATIONS",
  DELETE_CONVERSATIONS: "DELETE_CONVERSATIONS",
  GET_MESSAGES: "GET_MESSAGES",
};

export const addUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: { ...user, text: "", media: [] },
      });
    }
  };

export const addMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    socket.emit("addMessage", msg);

    try {
      const response = await postDataAPI("message", msg, auth.token);
      const { conversationId, recipient } = await response.data;

      const msgNotify = {
        id: auth.user._id,
        text: "message you.",
        recipients: [recipient],
        url: `/message/${auth.user._id}`,
        type: "textMessage",
      };

      dispatch(createNotify({ msg: msgNotify, auth, socket }));

      return { conversationId };
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getConversations =
  ({ auth, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `conversations?limit=${page * 9}`,
        auth.token
      );
      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({ ...cv, text: item.text, media: item.media });
          }
        });
      });

      dispatch({
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteConversation =
  ({ conversationId, userId, message, auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `deleteconversations/${conversationId}`,
        auth.token
      );
      const user = message.users.find((user) => user._id === userId);
      dispatch({
        type: MESSAGE_TYPES.DELETE_CONVERSATIONS,
        payload: { ...user, text: "", media: [] },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );

      dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: res.data });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

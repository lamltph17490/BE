import moment from "moment/moment";
import format from "date-format";
import Notification from "../models/notification";
export const newNotification = async (data) => {
  try {
    const newNotification = await new Notification(data).save();
    return newNotification;
  } catch (error) {
    return error;
  }
};
export const getUserListNotificationApi = async (req, res) => {
  const userId = req.params.id
  try {
    const userListNotification = await Notification.find({ userId })
      .populate("orderId")
      .sort({ createdAt: -1 })
      .exec();
    const unRead = userListNotification.filter(
      (item) => item.userId == userId && item.readed == false
    );
    const value = {
      notification: userListNotification,
      unRead: unRead.length,
    }
    res.json(value);
  } catch (error) {
    return error;
  }
};

export const getUserListNotification = async (userId) => {
  try {
    const userListNotification = await Notification.find({ userId })
      .populate("orderId")
      .sort({ createdAt: -1 })
      .exec();
    const unRead = userListNotification.filter(
      (item) => item.userId == userId && item.readed == false
    );
    return {
      notification: userListNotification,
      unRead: unRead.length,
    };
  } catch (error) {
    return error;
  }
};
export const list = async (req, res) => {
  try {
    const products = await Notification.find().sort("-createdAt").exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};

export const readNotification = async (req, res) => {
  try {
    const readNotification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { readed: true },
      { new: true }
    ).exec();

    const data = await getUserListNotification(readNotification.userId)
    return res.json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

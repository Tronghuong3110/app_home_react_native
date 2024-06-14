import React, { useState } from "react";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";
import { getCurrentMonth } from "@/constants/date";
import { formatMoney } from "@/constants/format";

export const config = {
  enpoint: "https://cloud.appwrite.io/v1",
  platform: "com.myapp.myapp",
  projectId: "664b792b003729243bbf",
  databaseId: "664b7ae1000a9ac5e773",
  userCollectionId: "664b7af8002fdc307ca0",
  weightCollection: "664b7b390020c7948295",
  itemCollection: "664b7b8e0010ec6bfdd0",
  storageId: "664b7de40007b13fe80d",
};

const client = new Client();

client
  .setEndpoint(config.enpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
const databases = new Databases(client);

// create user
export const createUser = async (name, phoneNumber, pass) => {
  try {
    const promiseCreateUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        name: name,
        phoneNumber: phoneNumber,
        role: "USER",
        password: pass,
      }
    );
    if (promiseCreateUser.total != 0) {
      return { id: promiseCreateUser.$id };
    }
    return {};
  } catch (err) {
    console.log(err);
  }
  return {};
};

// check phonrNumber exists
export const checkExistsPhoneNumber = async (phoneNumber, pass) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [
        Query.equal("phoneNumber", phoneNumber),
        Query.equal("password", pass != null ? pass : ""),
      ]
    );
    if (response.total == 0) {
      return null;
    }
    return {
      name: response.documents[0].name,
      role: response.documents[0].role,
      id: response.documents[0].$id,
    };
  } catch (error) {
    console.log(error);
  }
  return null;
};

// get all user
export const getAllUser = async () => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId
    );
    if (response.total == 0) {
      return null;
    }
    const users = response.documents.map(user => {
      return {
        value: user.$id,
        label: user.name
      };
    });
    return users;
  } catch (error) {
    console.log(error);
  }
  return null;
}

// add new productType
export const createProductType = async (productType, price) => {
  try {
    const response = await databases.createDocument(
      config.databaseId,
      config.itemCollection,
      ID.unique(),
      {
        name: productType,
        price: parseFloat(price),
      }
    );
    if (response.total == 0) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
};

// Thêm thông tin khối lượng hàng hóa
export const createWeightOfUser = async (
  date,
  userId,
  weight,
  typeProduct,
  price,
  nameProductType
) => {
  try {
    price = parseFloat(price.toString().replace(/₫/g, '')) * 1000;
    console.log("price " + price);
    const response = await databases.createDocument(
      config.databaseId,
      config.weightCollection,
      ID.unique(),
      {
        time: date,
        weight: parseFloat(weight),
        weightItem: typeProduct,
        user_weight: userId,
        price: parseFloat(price * weight),
        nameProductType: nameProductType,
      }
    );
    if (response.total == 0) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
};

// Laays ra danh danh sách các loại hàng
export const getAllProductType = async () => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.itemCollection
    );
    return response.documents.map((document) => {
      return {
        value: document.$id,
        label: document.name,
        price: document.price,
      };
    });
  } catch (err) {
    console.log("error: ");
    console.log(err);
    return [];
  }
};

// lấy danh tổng khối lượng và tổng tiền người dùng đã làm được tính từ đầu tháng tới ngày hiện tại
export const getTotalPriceAndWeight = async (month, userId) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.weightCollection,
      [
        Query.contains(
          "time",
          month != undefined && month != null ? month : ""
        ),
        Query.equal(
          "user_weight",
          userId != undefined && userId != null ? userId : "0"
        ),
      ]
    );
    if (response.total == 0) {
      return {
        totalPrice: formatMoney(0),
        totalWeight: 0,
      };
    }
    const responseData = response.documents.reduce(
      (accumulator, currentDocument) => {
        return {
          totalPrice: accumulator.totalPrice + currentDocument.price,
          totalWeight: accumulator.totalWeight + currentDocument.weight,
        };
      },
      { totalPrice: 0, totalWeight: 0 }
    );
    responseData["totalPrice"] = formatMoney(responseData["totalPrice"]);
    return responseData;
  } catch (err) {
    console.log(err);
    return {};
  }
};

// lấy danh sách cân nặng theo người và tháng
export const getListWeightOfUserAndMonth = async (
  month,
  userId,
  productTypeId
) => {
  try {
    const query = [
      Query.contains("time", month == null ? getCurrentMonth() : month),
      Query.equal("user_weight", userId),
      Query.orderAsc("time"),
    ];
    if (productTypeId != null) {
      query.push(Query.equal("weightItem", productTypeId));
    }
    const response = await databases.listDocuments(
      config.databaseId,
      config.weightCollection,
      query
    );
    const res = response.documents.map((document) => {
      return {
        date: document.time,
        nameProduct: document.nameProductType,
        weight: document.weight,
      };
    });
    const totalWeight = response.documents.reduce((acc, obj) => acc + obj.weight, 0);
    const dataResponse = Object.values(res).map(item => [item.date, item.nameProduct, item.weight]);
    return {
      data: dataResponse,
      totalWeight: totalWeight
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// lấy ra loại sản phẩm theo id
export const getProductTypeById = async (productTypeId) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.itemCollection,
      [Query.equal("$id", productTypeId)]
    );
    return response.documents[0].name;
  } catch (err) {
    console.log("error: ");
    console.log(err);
    return null;
  }
};

//  lấy cân nặng và tổng tiền của 1 người theo 1 ngày
export const getWeightByDate = async (date, userId) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.weightCollection,
      [Query.equal("time", date), Query.equal("user_weight", userId)]
    );
    const responseData = response.documents.reduce(
      (accumulator, currentDocument) => {
        return {
          totalPrice: accumulator.totalPrice + currentDocument.price,
          totalWeight: accumulator.totalWeight + currentDocument.weight,
        };
      },
      { totalPrice: 0, totalWeight: 0 }
    );
    return responseData;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getAllWeightByMonthAndGroupByProductType = async (
  month, userId, type
) => {
  try {
    const query = [Query.contains("time", month == null ? getCurrentMonth() : month)];
    if(userId != null) {
      query.push(
        Query.equal("user_weight", userId)
      );
    }
    // console.log(query);
    const response = await databases.listDocuments(
      config.databaseId,
      config.weightCollection,
      query
    );
    const result = response.documents.reduce((acc, item) => {
      const weightItemId = item.weightItem.$id;
      const weightItemName = item.weightItem.name;
      const username = item.user_weight.name;
      if (!acc[weightItemId]) {
        acc[weightItemId] = {
          totalPrice: 0,
          totalWeight: 0,
          name: weightItemName,
          username: username
        };
      }
      acc[weightItemId].totalPrice += item.price;
      acc[weightItemId].totalWeight += item.weight;
      return acc;
    }, {});
    if(type == 1) {
      return Object.values(result).map(item => [item.name, item.totalWeight.toString(), formatMoney(item.totalPrice)]);
    }
    else if(type == 2) {
      return Object.values(result).map(item => [item.username, item.name, item.totalWeight.toString()]);
    }
    else {
      return Object.values(result).map(item => [item.username, item.name, item.totalWeight.toString(), formatMoney(item.totalPrice)]);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

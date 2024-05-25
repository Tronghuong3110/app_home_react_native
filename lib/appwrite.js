import React, { useState } from "react";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

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

export const createUser = async (name, phoneNumber) => {
  try {
    if (checkExistsPhoneNumber(phoneNumber) == null) {
      alert("Số điện thoại đã tồn tại, vui lòng sử dụng số điện thoại mới!!");
      return false;
    }
    const promiseCreateUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        name: name,
        phoneNumber: phoneNumber,
        role: "USER",
      }
    );
    if(promiseCreateUser.total != 0) {
      alert("Đăng ký tài khoản thành công!!")
      return true;
    }
    return false;
  }
  catch(err) {
    console.log(err);
  }
  return false;
};

// check phonrNumber exists
export const checkExistsPhoneNumber = async (phoneNumber) => {
  const response = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal("phoneNumber", phoneNumber)]
  );
  if (response.total == 0) {
    return null;
  }
  // console.log(response.documents[0].role)
  return {name: response.documents[0].name, role: response.documents[0].role};
};

// add new productType
export const createProductType = async (productType, price) => {
  try {
    const response = await databases.createDocument(
      config.databaseId,
      config.itemCollection,
      ID.unique(),
      {
        name: productType,
        price: price
      }
    );
    console.log(response);
    if(response.total == 0) {
      return false;
    }
    return true;
  }
  catch(err) {
    console.log(err);
  }
  return false;
}
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

export const createUser = (name, phoneNumber) => {
  if(checkExistsPhoneNumber(phoneNumber, function(x) {}) == null) {
    alert("Số điện thoại đã tồn tại, vui lòng sử dụng số điện thoại mới!!")
    return false;
  }
  const promiseCreateUser = databases.createDocument(
    config.databaseId,
    config.userCollectionId,
    ID.unique(),
    {
      name: name,
      phoneNumber: phoneNumber,
      role: "USER",
    }
  );
  promiseCreateUser.then(
    function (response) {
      // console.log(response);
      alert("Đăng ký tài khoản thành công!!");
      return true;
    },
    function (error) {
      console.log(error);
      return false;
    }
  );
  return false;
};

// check phonrNumber exists
export const checkExistsPhoneNumber = (phoneNumber, fn) => {
  // const [name, setName] = useState(null);
  let promise = databases.listDocuments(config.databaseId, config.userCollectionId, [
    Query.equal("phoneNumber", phoneNumber),
  ]);
  const name = null;
  promise.then(
    function (response) {
      if(response.total == 0) {
        return null;
      }
      fn(response.documents[0].name);
    },
    function (error) {
      console.log(error);
    }
  );
  return name;
};

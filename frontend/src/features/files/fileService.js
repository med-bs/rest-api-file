import axios from "axios";

const API_URL = "/api/files/";

// Create new file
const createFile = async (fileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, fileData, config);

  return response.data;
};

// Get user files
const getFiles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update user file
const updateFile = async (fileId, fileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + fileId, fileData, config);

  return response.data;
};

// Delete user file
const deleteFile = async (fileId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + fileId, config);

  return response.data;
};

const FileService = {
  createFile,
  getFiles,
  updateFile,
  deleteFile,
};

export default FileService;

// const axios = require("axios");
import axios from "axios";

/**
 * Fetch all file URLs from a public Google Drive folder using API key.
 * @param {string} folderId - The ID of the public Google Drive folder.
 * @param {string} apiKey - Your Google API key.
 * @returns {Promise<Array>} - A list of file objects with name, id, mimeType, viewUrl, and downloadUrl.
 */
export default async function getDriveUrls(folderId, apiKey) {
  const url = "https://www.googleapis.com/drive/v3/files";
  const params = {
    key: apiKey,
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id,name,mimeType)",
    pageSize: 1000,
  };

  try {
    const response = await axios.get(url, { params });
    const files = response.data.files;

    return files.map((file) => {
      return {
        name: file.name,
        id: file.id,
        mimeType: file.mimeType,
        // viewUrl: `https://drive.google.com/file/d/${file.id}/view`,
        // downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
      };
    });
  } catch (error) {
    console.error(
      "Error fetching Google Drive files:",
      error.response?.data || error.message
    );
    throw error;
  }
}

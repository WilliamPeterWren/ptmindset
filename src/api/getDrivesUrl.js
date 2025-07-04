import axios from "axios";

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

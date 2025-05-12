const cloudinaryConfig = {
  cloudName: "dbts8cjg6",
  apiKey: "158555518541435",
  uploadPreset: "pashuDoot",
  // Add if using signed uploads:
  // apiSecret: "your_api_secret" 
};

export async function uploadToCloudinary(file) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Validate file type and size
    if (!file.type.match('image.*')) {
      throw new Error('Only image files are allowed');
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size exceeds 10MB limit');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('api_key', cloudinaryConfig.apiKey);
    // Add timestamp for signed requests if needed
    // formData.append('timestamp', Math.round((new Date).getTime()/1000));

    console.log('Starting upload for file:', file.name);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
        // Add CORS mode
        mode: 'cors'
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary response error:', errorData);
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Upload successful:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', {
      error: error.message,
      file: file?.name,
      type: file?.type,
      size: file?.size
    });
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

export async function uploadMultipleToCloudinary(files) {
  try {
    if (!files || !files.length) {
      console.log('No files to upload');
      return [];
    }

    console.log(`Starting upload of ${files.length} files`);
    const results = await Promise.all(
      Array.from(files).map((file, index) => {
        console.log(`Uploading file ${index + 1}/${files.length}:`, file.name);
        return uploadToCloudinary(file).catch(e => {
          console.error(`Failed to upload ${file.name}:`, e);
          return null; // Continue with other files if one fails
        });
      })
    );

    // Filter out any failed uploads
    const successfulUploads = results.filter(url => url !== null);
    console.log(`Completed ${successfulUploads.length}/${files.length} uploads`);
    
    return successfulUploads;
  } catch (error) {
    console.error('Bulk upload error:', error);
    throw new Error(`Failed to upload files: ${error.message}`);
  }
}
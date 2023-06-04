export const checkImage = (file) => {
    let err = "";
    if (!file) {
        return err = "File does not exist.";
    }
    //?1 mb
    if (file.size > 1024 * 1024) {
        return (err = "File size must be less than 1 Mb.");
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = "Image must be jpeg or png.");
    }

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];

    for (const item of images) {
        const formData = new FormData();

        if (item.camera) {
            formData.append("file", item.camera);
        } else {
            formData.append("file", item);
        }

        const upload_preset = process.env.REACT_APP_UPLOAD_PRESET
        const cloud_name = process.env.REACT_APP_CLOUD_NAME
        const cloudniaryURL = process.env.REACT_APP_CLOUDNIARY_URL

        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", cloud_name);

        const res = await fetch(cloudniaryURL, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }

    return imgArr;
};

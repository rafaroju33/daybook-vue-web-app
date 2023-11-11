import cloudinary from "cloudinary";
import axios from "axios";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

// cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: "",
// });

describe("Test in the uploadImage", () => {
  test("should upload a file to cloudinary and return the URL", async () => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dvxrewifk/image/upload/v1699736611/IT_Hotel_jxsqzn.png",
      {
        responseType: "arraybuffer",
      }
    );

    const file = new File([data], "foto.jpg");
    const url = await uploadImage(file);
    expect(typeof url).toBe("string");

    //Tomar el id
    // const segments = url.split("/");
    // const imageId = segments[segments.length - 1].replace(".png", "");
    // const deleted = await cloudinary.v2.api.delete_resources(`${imageId}`);
  });
});

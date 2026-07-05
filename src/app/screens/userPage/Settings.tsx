import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";

const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.target.style.height = "auto";           /* avval reset qilinadi */
  e.target.style.height = e.target.scrollHeight + "px"; /* keyin content balandligiga teng qilinadi */
};

export function Settings() {
  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={"/icons/default-user.svg"} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={"Martin"}
            value={"Martin"}
            name="memberNick"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={"no phone"}
            value={"821024694424"}
            name="memberPhone"
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={"no address"}
            value={"no address"}
            name="memberAddress"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
                name={"memberMsg"}
                placeholder={"No description"}
                onChange={handleTextareaChange}
                style={{
                  resize: "none",
                  overflow: "hidden",
                  minHeight: "100px",
                  maxHeight: "400px",
                  width: "100%",
                }}
              ></textarea>


          {/* <textarea
            className={"spec-textarea mb-description"}
            placeholder={"no description"}
            value={"no description"}
            name="memberDesc"
          /> */}
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"}>Save</Button>
      </Box>
    </Box>
  );
}

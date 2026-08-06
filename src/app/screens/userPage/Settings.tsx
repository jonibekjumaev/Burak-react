import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberInput, MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import MemberService from "../../services/MemberService";
import { error } from "console";

const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.target.style.height = "auto";           /* avval reset qilinadi */
  e.target.style.height = e.target.scrollHeight + "px"; /* keyin content balandligiga teng qilinadi */
};




export function Settings() {

const {authMember, setAuthMember} = useGlobals();
const [memberImage, setMemberImage] = useState<string>(
  authMember?.memberImage 
  ? `${serverApi}/${authMember.memberImage}` 
  : "/icons/default-user.svg"
);
const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput> ({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberPassword: authMember?.memberPassword,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
});


/** HANDLERS */

const memberNickHandler = (e: T) => {
 memberUpdateInput.memberNick = e.target.value;
 setMemberUpdateInput({...memberUpdateInput}); 
};

const memberPhoneHandler = (e: T) => {
 memberUpdateInput.memberPhone = e.target.value;
 setMemberUpdateInput({...memberUpdateInput}); 
};

const memberAddressHandler = (e: T) => {
 memberUpdateInput.memberAddress = e.target.value;
 setMemberUpdateInput({...memberUpdateInput}); 
};

const memberDescHandler = (e: T) => {
 memberUpdateInput.memberDesc = e.target.value;
 setMemberUpdateInput({...memberUpdateInput}); 
};


const handleSubmitButton = async () => {
  try { 
    if(!authMember) throw new Error(Messages.error2);

    if (
      memberUpdateInput.memberNick === "" ||
      memberUpdateInput.memberPhone === "" ||
      memberUpdateInput.memberAddress === "" ||
      memberUpdateInput.memberDesc === ""
    ) {
      throw new Error(Messages.error3); 
    }

    const member = new MemberService();
    const result = await member.updateMember(memberUpdateInput);
    setAuthMember(result);
    
    await sweetTopSmallSuccessAlert("modified successfully", 1000);
  } catch (err) {
    console.log(err);
    sweetErrorHandling(err);
  }
};

const handlerImageViewer = (e: T) => {
  const file = e.target.files[0];
  const fileType = file.type, 
  validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if(!validateImageTypes.includes(fileType)) {
    sweetErrorHandling(Messages.error5).then(); 
  } else {
    if(file) {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({...memberUpdateInput});
      setMemberImage(URL.createObjectURL(file)); 
    }
  }


  }



  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handlerImageViewer} >
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
            placeholder={authMember?.memberNick}
            value={memberUpdateInput?.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "No phone"}
            value={memberUpdateInput?.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={authMember?.memberAddress ?? "No address"}
            value={memberUpdateInput?.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
                name={"memberMsg"}
                placeholder={authMember?.memberDesc ?? "No description"}
                value={memberUpdateInput?.memberDesc}
                onChange={(e) => {
                  handleTextareaChange(e);
                  memberDescHandler(e);
                }}
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
        <Button variant={"contained"} onClick={handleSubmitButton} >Save</Button>
      </Box>
    </Box>
  );
}

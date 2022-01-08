import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import Box from "@mui/material/Box";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@material-tailwind/react/Input";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
// import Button from "@material-tailwind/react/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function AddDoc() {
  const [open, setOpen] = React.useState(false);
  const [docName, setDocName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [session, loading] = useSession();

  // const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'));

  const createDocument = () => {
    if (!docName) {
      return;
    }
    // alert(docName);

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      filename: docName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setDocName("");
    handleClose();
  };

  const modal = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Input
          type="text"
          color="lightBlue"
          size="lg"
          outline={false}
          placeholder="Document Name"
          onChange={(e) => setDocName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createDocument();
          }}
        />

        <div className="mt-10 flex ">
          <Button
            sx={{ mx: 6 }}
            className="mr-6"
            buttonType="outline"
            onClick={handleClose}
          >
            Cancel{" "}
          </Button>
          <Button sx={{ mt: 6 }} onClick={createDocument}>
            Create{" "}
          </Button>
        </div>
      </Box>
    </Modal>
  );

  return (
    <>
      <div className="py-6 flex items-center justify-between">
        <h2 className="text-gray-700 text-base font-normal ">
          Start a new document
        </h2>

        <div className="flex items-center divide-x ">
          <div>
            <Button
              color="black"
              buttonType="outline"
              size="sm"
              rounded={false}
              iconOnly={false}
              ripple="dark"
              className="border-0  border-blue-500 capitalize hover:bg-gray-400"
            >
              <h2
                className=" text-smbb
       font-medium "
              >
                Template gallery
              </h2>
              <Icon name={"unfold_more"} size={"2xl"} />
            </Button>
          </div>

          <div>
            <Button
              color="#a0aec0"
              buttonType="outline"
              size="regular"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="border-0 border-blue-500"
            >
              <Icon name={"more_vert"} size={"2xl"} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="relative h-52 w-40 border-2 border-slate-100 cursor-pointer hover:border-blue-700">
          <Image
            src="https://links.papareact.com/pju"
            layout="fill"
            onClick={handleOpen}
          />
        </div>

        <p className="text-sm ml-2 font-semibold  mt-2 text-gray-700">Blank</p>
      </div>

      {modal}
    </>
  );
}

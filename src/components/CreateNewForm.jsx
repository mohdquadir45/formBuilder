import { useEffect, useState } from "react";
import { Typography, Container, Box, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonTypes from "./ButtonTypes";

const inputsButtonData = [
  { name: "TEXT" },
  { name: "NUMBER" },
  { name: "EMAIL" },
  { name: "PASSWORD" },
  { name: "DATE" },
];


export default function CreateNewForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Untitled Form");
  const [editTitle, setEditTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [editinput, setEditInput] = useState(null);

  const [showTextInputBtns, setShowTextInputBtns] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleInputChange = (event) => {
    setTitle(event.target.value);
    setEditTitle(event.target.value);
  };
  const handleFormInputChange = (event,editInput) => {
    console.log("event=>",event,editInput,inputs)
    let obj = {...editInput, value:event.target.value}
    setEditInput(obj)
    let indexToReplace = inputs.findIndex(item => item.id === editInput.id);

    if (indexToReplace !== -1) {
        inputs[indexToReplace] = obj;
    }
  };

  const handleAppInput = () => {
    setShowTextInputBtns(!showTextInputBtns);
  };

  const inputEdit = (input) => {
    setEditInput(input);
  };


  console.log(editinput, "ttt");
  const showInputField = (
    <TextField
      type="text"
      value={editTitle}
      label="Title"
      id="standard-basic"
      variant="standard"
      onChange={handleInputChange}
    />
  );

  async function getFormDataFromDb(){
    let res = await fetch("http://localhost:3000/api/form-input");
    res = await res.json();
    setInputs(res?.data)
  }

  async function deleteFormDatafromDb(input){
    let res = await fetch("http://localhost:3000/api/form-input/"+input.id,{
      method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json'
            } 
    })

    if (inputs.length == 1) {
      setEditInput();
    }
    await getFormDataFromDb()
  }

  async function addFormDataToDb(el){
    let res = await fetch("http://localhost:3000/api/form-input",{
        method: "POST",
        body: JSON.stringify(el),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      res = await res.json();
     await getFormDataFromDb()

  }

  useEffect(()=>{
    getFormDataFromDb()
  },[])

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            width: "100%",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h4">
              Create New Form
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          border: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ padding: 2, alignItems: "center" }} >
          <Typography variant="h4" component="h4">
            {title}
            <EditIcon style={{ cursor: "pointer" }} onClick={handleEditClick} />
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {inputs.map((input, i) => (
              <Box
                key={i}
                sx={{
                  marginX: 1,
                  backgroundColor: "white",
                  boxShadow: 5,
                  padding: 1,
                  borderRadius: 1,
                  alignItems: "center",
                }}
              >
                {/* <TextField
                  type="text"
                  value={editTitle}
                  label="Title"
                  id="standard-basic"
                  variant="standard"
                  onChange={handleInputChange}
                /> */}
                <TextField
                  // value={input.value}
                  variant="standard"
                  label={input.value ? input.value : "Title"}
                  placeholder="Title"
                  disabled
                />
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => inputEdit(input)}
                  color={"primary"}
                />
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteFormDatafromDb(input)}
                  color={"error"}
                />
              </Box>
            ))}
          </Box>

          <Box>
            <ButtonTypes
              btnTitle={!showTextInputBtns ? "ADD INPUT" : "CLOSE ADD INPUT"}
              onClickHandle={handleAppInput}
              variatnt={"outlined"}
            />
          </Box>

          <Box >
            {showTextInputBtns ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItem: "center",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                {inputsButtonData.map((btn, i) => (
                  <Box key={i} sx={{ marginX: 1 }}>
                    <ButtonTypes
                      btnTitle={btn.name}
                      variatnt={"contained"}
                      onClickHandle={() =>
                        setInputs((prev) => [
                          ...prev,
                          {
                            id:Math.floor(10000 + Math.random() * 90000),
                            name: btn.name,
                            title: "",
                            placeholder: "",
                            value: "",
                          },
                        ])
                      }
                    />
                  </Box>
                ))}
              </Box>
            ) : null}
          </Box>
        </Box>

        <Box sx={{ borderLeft: 1, padding: 2 }} >
          <Typography variant="body2" component="p">
            Form Editor
          </Typography>
          {!editinput ? (
            isEditing && showInputField
          ) : (
            <Box>
              <Typography>{editinput.name}</Typography>
              <TextField
                type="text"
                value={editinput.value}
                label="Title"
                id="standard-basic"
                variant="standard"
                onChange={(event) => handleFormInputChange(event, editinput)}
              />
              <TextField
                type="text"
                // value={editinput.value}
                label="Placeholder"
                id="standard-basic"
                variant="standard"
                onChange={(event) => handleFormInputChange(event, editinput)}
              />
            </Box>
          )}
        </Box>
      </Container>
      <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          width: "100%",
        }}>
       <ButtonTypes  
       btnTitle={"Save Form"} 
       variatnt={"contained"} 
       onClickHandle={() =>{
        let arr = inputs.filter(obj => !('_id' in obj))
        arr.forEach((el)=>{
          addFormDataToDb(el)
        })

       }}  />
      </Box>
     
    </>
  );
}

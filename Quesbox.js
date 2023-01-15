import { Close } from '@mui/icons-material';
import { Avatar , Button, Input} from '@mui/material';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import CategoryIcon from '@mui/icons-material/Category';
import React, {useState} from 'react';
import Modal from 'react-responsive-modal';
import './CSS/quesbox.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';



function Quesbox() {
const[isModalOpen, setisModalOpen] = useState(false);
const [imgUrl, setimgUrl]=useState((""));
const [question, setQuestion] = useState("");
const close=(<Close />);
const user = useSelector(selectUser);

const handleSubmit= async () =>{

  if(question !==""){
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = {
      questionName: question,
      questionUrl: imgUrl,
      user: user,
    }
    await axios.post('/api/questions',body,config).then((res)=>{
      console.log(res.data);
      alert(res.data.message);
      window.location.href ="/";
    }).catch((e)=>{
      console.log(e);
      alert('error in adding question')
    });
  }
};



  return (
    <div className='quesbox'>
        <div className="user" >
            <Avatar src={user?.photo}/>
        </div>
        <div className="quesasker">
            <p className="askques">Wanna share doubts? </p>
        </div>
        <div className="ques_btn">
        <Button className="quesbtn" onClick={()=> setisModalOpen(true)}>Ask Doubts</Button>
        <Modal
        open = {isModalOpen}
        closeIcon = {close}
        onClose = {()=> setisModalOpen(false)}
        closeOnEsc
        centercloseOnOverlayClick={false}
        styles={{
          overlay: {
            height:"auto",
          }
        }}
        >
          <div className="modal_title">
            <h5>Ask Question</h5>
            <h5>link</h5>
          </div>
          <div className="modal_info">
            <Avatar className='avatar' src={user?.photo}/>
            <div className="describecategory">
              <CategoryIcon />
              <p>Category</p>
              <ExpandMoreSharpIcon />
            </div>
          </div>
          <div className="modal_content">
            <Input value={question}
            onChange={(e) => setQuestion(e.target.value)} 
            type='text' placeholder='share the question here' />
            <div style={{
              display:"flex",
              flexDirection:"column"
            }}>
              <input 
              value = {imgUrl}
              onChange = {(e) => setimgUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border:"1px solid lightgray",
                padding:"10px",
                outlint:"2",
              }}
              type="text" placeholder='optional:place a link of image if needed' />
              {
                imgUrl !=="" &&  <img 
                style={{
                  height:"40vh",
                  objectFit:"contain",
                }} src={imgUrl} alt='image' />
              }
             
            </div>
          </div>
          <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit}type='submit' className='add'>
              Add Question
            </button>
          </div>
        </Modal>
        </div>
    </div>
  )
}

export default Quesbox
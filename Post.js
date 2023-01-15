import AddIcon from '@mui/icons-material/Add';
import { Avatar, Button } from '@mui/material';
import React, {useState} from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import Modal from 'react-responsive-modal';
/* import './CSS/quesbox.css'; */
import './CSS/post.css';
import { Close } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactTimeAgo from "react-time-ago";
import axios from 'axios';
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }

function Post({post}) {
    const[isModalOpen, setisModalOpen] = useState(false);
    const [ans, setAns]=useState("");
    const [like, setLike]=useState([]);
    //const [islike, setIsLike]=useState(false);
    const close=(<Close />)
    const user = useSelector(selectUser);

    const handleQuill =(value)=>{
        setAns(value)
    }
    console.log(ans);

    const handleSubmit=async()=>{
        if(post?._id && ans!==""){
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const body = {
                answer:ans,
                questionId:post?._id,
                user:user,
               // like:like,
               // islike: islike,
            }
            await axios.post('/api/answers',body,config).then((res)=>{
                console.log(res.data)
                alert('Answer added successfully');
                setisModalOpen(false)
                window.location.href = '/'
            }).catch((e)=>{
                console.log(e);
            })
        }
    }


    function handleLike(value){
        fetch(`/api/questions/${value}`,{
            method:'DELETE'
        }).then((result)=>{
            console.log(result)
        })
    }

/*     const handleLike= async ()=>{
       // setIsLike(true);
       //setLike(like + (islike? 1 : -1));

     setLike([...like, user?._id]);

     const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const body = {
       // answer:ans,
        answerId:post?._id,
        like:like,
       // like:like,
       // islike: islike,
    }
    await axios.post('/api/likes',body,config).then((res)=>{
        console.log(res.data)
       // alert('Answer added successfully');
       // setisModalOpen(false)
       // window.location.href = '/'
    }).catch((e)=>{
        console.log(e);
    })
   
    } */

  return (
    <div className='post'>
        <div className="post_info">
            <Avatar src={user?.photo}/>
            <h4>{user?.userName}</h4>
            <span><small><LastSeen date={post?.createdAt} /></small></span>
        </div>
        <div className="post_body">
            <p>{post?.questionName}</p>
            { post?.questionUrl !=="" &&
            <img style={{
                width:"60%",
                height:"60%",
                margin:"auto",
            }}
            src={post.questionUrl}  />
           }   




        </div>
        <div className="postfooter">
                <Button>{post?.allAnswers.length} Answer(s) </Button>
                <div className="answericon">
                <AddIcon onClick={()=>{
                    setisModalOpen(true);
                    console.log(post?._id);
                }}
                 />
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
            <div className="modal_quesn">
                <h1>{post?.questionName}</h1>

                <p>asked by {" "}</p><span>{user?.userName}</span>{" "}{new Date(post?.createdAt).toLocaleString()}
            </div>
            <div className="ans">
                <ReactQuill value={ans}
                onChange={handleQuill}placeholder="Enter your Answer"/>
            </div>
            <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit}type='submit' className='add'>
              Add{"  "}Answer
            </button>
            </div>
        </Modal>
                </div>
            
            
        </div>
        <div style={{
            margin:"5px 0px 0px 0px",
            padding: "5px 0px 0 20px",
            borderTop: "1px solid lightgray",
        }}
            className="post_answer">
            



                {
                    post?.allAnswers?.map((_a)=>(
                        <>
                        <div style={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
                padding:"10px 5px",
                borderBottom: "1px solid lightgray",
            }}
            className="answer_container">
                        <div style={{
                display:"flex",
                alignItems:"center",
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight:"600",
                color:"#888",
            }}
                className="post_answered">
                    <Avatar src={_a?.photo}/>
                    <div 
                  
                    className="post_answer_info">
                        <p>{user?.userName}</p>
                        <span><LastSeen date={_a?.createdAt} /></span>
                    </div>
                </div>
                <div style={{
                        margin: "0 10px",
                        marginLeft:"3rem",
                        marginBottom:"2rem",
                    }}
                className="answer_block">
                    {ReactHtmlParser(_a?.answer)}
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                }}
                className="answerfooter">
                    <div style={{
                        paddingRight:"10px",
                        
                    }}
                    className="like">
                        {/* <button  onclick={handleLike(_a?._id)}> like</button> */}
                    <ThumbUpIcon  /> 
                    </div>
                    <div style={{
                    paddingLeft:"10px",
                    paddingRight:"30px",
                    color:"blue",
                   }}
                   className="dislike">
                   <ThumbDownIcon  />
                   </div>
                    <div className="rate" >
                    <StarIcon style={{color:"yellow"}}/>
                    <StarIcon style={{color:"yellow"}}/>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    </div>
                  
                    <div style={{
                        paddingLeft:"30px",
                    }}
                    className="comment">
                    <ChatBubbleIcon />
                    </div>
                    </div>
                    </div>
                        </>
                    ))
                }
                
               
                       
             
        </div>
    </div>
  )
}

export default Post
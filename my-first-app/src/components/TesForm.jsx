import {params} from 'react'
import {toast} from "react-toastify";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
  } from '@mui/material';

  import { PostMq } from '../services/apiService';
    
  const postTest = ({open,setOpen}) =>{
    const SubmitDataHandler = async(e) =>{
        e.preventDefault();
        const { cmd, title, description, noti } = e.target.elements;
        const params ={
            cmd: cmd.value,
            title: title.value,
            description: description.value,
            noti: noti.value
        };
        
        console.log(params);
        const created = await PostMq(params);
        if (created.status === 200) {
            setOpen(false);
        }
    };

    return(
        <Dialog
            fullWidth
            maxWidth="md"
            open = {open}
            onClose = {()=> setOpen(false)}
            >
                <DialogTitle>로봇 호출 테스트</DialogTitle>
                <form onSubmit={SubmitDataHandler}>
                    <DialogContent>
                        <DialogContentText sx={{display: 'flex'}}/>
                        <TextField name="cmd" label="커맨드" fullWidth variant="standard" />
                        <TextField name="title" label="제목" fullWidth variant="standard" />
                        <TextField name="description" label="description" fullWidth variant="standard" />
                        <TextField name="noti" label="noti" fullWidth variant="standard"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
        </Dialog>
    )
  };


  export default postTest;
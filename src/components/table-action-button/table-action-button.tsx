import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const TableActionButton = (props: any) => {
  const { handleEdit, projectId, projectStatus, updateCount, setUpdateCount, isUpdating, setIsUpdating } = props;
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(projectStatus);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOK = () => {
    setOpen(false);
    setIsUpdating(true);
    handleEdit(projectId, selectedStatus);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };
  return (
    <>
      <IconButton color="primary" component="span" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>選擇 projectStatus</DialogTitle>
        <DialogContent>
          <Select value={selectedStatus} onChange={handleStatusChange}>
            <MenuItem value={0}>0 提案</MenuItem>
            <MenuItem value={1}>1 審核</MenuItem>
            <MenuItem value={2}>2 退件</MenuItem>
            <MenuItem value={3}>3 募資中</MenuItem>
            <MenuItem value={4}>4 募資成功</MenuItem>
            <MenuItem value={5}>5 募資失敗</MenuItem>
            <MenuItem value={6}>6 退款中</MenuItem>
            <MenuItem value={7}>7 回饋品準備中</MenuItem>
            <MenuItem value={8}>8 回饋品寄送完成</MenuItem>
            <MenuItem value={9}>9 結案</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOK}>確定</Button>
          <Button onClick={handleClose}>關閉</Button>
        </DialogActions>
      </Dialog>
      {isUpdating && (
        <Dialog open={isUpdating}>
          <DialogTitle>募質部，慕質中。</DialogTitle>
          <DialogContent>
            <DialogContentText>資料更新中。</DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TableActionButton;

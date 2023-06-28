import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableActionButton from '../components/table-action-button/table-action-button';
import { UserContext } from '../contexts/user.context';
import { projectStatusEnum } from '../types/enum';
import { IProjectState } from '../types/project';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const basePoint = 'https://mujibu-server-fau1.onrender.com/api';
  const [projectArr, setProjectArr] = useState<IProjectState[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProjectState[]>([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = 'page=1&perPage=60';

  //   const columns: GridColDef[] = [
  //     { field: 'id', headerName: 'ID', width: 70 },
  //     { field: 'firstName', headerName: 'First name', width: 130 },
  //     { field: 'lastName', headerName: 'Last name', width: 130 },
  //     {
  //       field: 'age',
  //       headerName: 'Age',
  //       type: 'number',
  //       width: 90,
  //     },
  //     {
  //       field: 'fullName',
  //       headerName: 'Full name',
  //       description: 'This column has a value getter and is not sortable.',
  //       sortable: false,
  //       width: 160,
  //       valueGetter: (params: any) =>
  //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //     },
  //   ];

  //   const rows = [
  //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  //   ];

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const res = await fetch(`${basePoint}/backend/project/list?${params}`).then((res) => res.json());
      console.log({ res }, res.data.length);
      setProjectArr(res.data);
    })();
  }, []);

  useEffect(() => {
    if (!projectArr) return;
    const filteredProjects = projectArr.filter((project) => {
      return project.projectStatus !== undefined;
    });

    setFilteredProjects(filteredProjects);

    console.log('Pending Projects:', { filteredProjects });
  }, [projectArr]);

  useEffect(() => {
    if (!currentUser || updateCount === 0) return;
    (async () => {
      const res = await fetch(`${basePoint}/backend/project/list?${params}`).then((res) => res.json());
      console.log('projectArr', { res }, res.data.length);
      setProjectArr(res.data);
    })();
  }, [updateCount]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
    return () => {};
  }, [currentUser]);

  const handleEdit = (projectId: string, projectStatus: number) => {
    const payload = {
      projectStatus,
    };
    fetch(`${basePoint}/backend/project/${projectId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          console.log('API 請求成功');
          setUpdateCount(updateCount + 1);
          setTimeout(() => {
            setIsUpdating(false);
          }, 2500);
        } else {
          console.log('API 請求失敗，狀態碼: ', response.status);
        }
      })
      .catch((error) => {
        console.log('發生錯誤: ', error);
      });
  };

  return (
    <>
      <Typography component="h1" variant="h1" className="text-primary">
        大廳
      </Typography>
      {filteredProjects.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Prize</TableCell>
                  <TableCell>Backers</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>{project.goalAmount}</TableCell>
                    <TableCell>{project.projectBackers}</TableCell>
                    <TableCell>
                      {project.projectStatus}{' '}
                      {projectStatusEnum[project.projectStatus as keyof typeof projectStatusEnum]}{' '}
                    </TableCell>
                    <TableCell>
                      <TableActionButton
                        updateCount={updateCount}
                        setUpdateCount={setUpdateCount}
                        isUpdating={isUpdating}
                        setIsUpdating={setIsUpdating}
                        handleEdit={handleEdit}
                        projectId={project._id}
                        projectStatus={project.projectStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Dashboard;

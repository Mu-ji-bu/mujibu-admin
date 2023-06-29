import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableActionButton from '../components/table-action-button/table-action-button';
import { UserContext } from '../contexts/user.context';
import { projectStatusEnum } from '../types/enum';
import { IProjectState } from '../types/project';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import dayjs from 'dayjs';

// interface Data {
//   name: string;
//   prize: number;
//   backers: string;
//   status: number;
//   action: number;
// }

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const basePoint = 'https://mujibu-server-fau1.onrender.com/api';
  const [projectArr, setProjectArr] = useState<IProjectState[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProjectState[]>([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = 'page=1&perPage=60';

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
      setIsUpdating(false);
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
          // setTimeout(() => {
          // }, 2500);
        } else {
          console.log('API 請求失敗，狀態碼: ', response.status);
        }
      })
      .catch((error) => {
        console.log('發生錯誤: ', error);
      });
  };

  const VirtuosoTableComponents: TableComponents = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const generated: any[] = [];

  function generateProjects(length: number, startIndex = 0) {
    return Array.from({ length }).map((_, i) => getProjects(i + startIndex));
  }

  const getProjects = (index: number) => {
    if (!generated[index]) {
      generated[index] = projects(index);
    }

    return generated[index];
  };

  const projects = (index: number) => {
    return {
      index: index + 1,
      action: (
        <TableActionButton
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          handleEdit={handleEdit}
          projectId={filteredProjects[index]._id}
          projectStatus={filteredProjects[index].projectStatus}
        />
      ),
      status: `${filteredProjects[index].projectStatus} ${
        projectStatusEnum[filteredProjects[index].projectStatus as keyof typeof projectStatusEnum]
      }`,
      name: filteredProjects[index].projectName,
      team: filteredProjects[index].projectTeam?.teamName,
      startTime: dayjs(filteredProjects[index].startTime).format('YYYY-MM-DD'),
      endTime: dayjs(filteredProjects[index].endTime).format('YYYY-MM-DD'),
      prize: filteredProjects[index].currentAmount,
      goal: filteredProjects[index].goalAmount,
      backers: filteredProjects[index].projectBackers,
      description: filteredProjects[index].projectDescription,
    };
  };

  return (
    <>
      <div className="lobin flex justify-center my-8">
        <Typography component="h1" variant="h1" className="text-primary">
          專案列表
        </Typography>
      </div>
      {filteredProjects.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Paper style={{ height: 450, width: '100%' }}>
              <TableVirtuoso
                data={generateProjects(filteredProjects.length)}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => (
                  <>
                    <TableRow style={{ backgroundColor: '#1CA69A' }}>
                      <TableCell style={{ width: 50 }}>ID</TableCell>
                      <TableCell style={{ width: 100 }}>編輯狀態</TableCell>
                      <TableCell style={{ width: 150 }}>專案狀態</TableCell>
                      <TableCell style={{ width: 700 }}>專案名稱</TableCell>
                      <TableCell style={{ width: 250 }}>募資團隊</TableCell>
                      <TableCell style={{ width: 150 }}>開始時間</TableCell>
                      <TableCell style={{ width: 150 }}>截止時間</TableCell>
                      <TableCell style={{ width: 100 }}>目前金額</TableCell>
                      <TableCell style={{ width: 100 }}>目標金額</TableCell>
                      <TableCell style={{ width: 100 }}>募資人數</TableCell>
                    </TableRow>
                  </>
                )}
                itemContent={(index, project) => (
                  <>
                    <TableCell>{project.index}</TableCell>
                    <TableCell>{project.action}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.team}</TableCell>
                    <TableCell>{project.startTime}</TableCell>
                    <TableCell>{project.endTime}</TableCell>
                    <TableCell>{project.prize}</TableCell>
                    <TableCell>{project.goal}</TableCell>
                    <TableCell>{project.backers}</TableCell>
                  </>
                )}
              />
            </Paper>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;

{
  /* <TableContainer component={Paper}>
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
</TableContainer> */
}

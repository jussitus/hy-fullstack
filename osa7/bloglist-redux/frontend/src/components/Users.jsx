import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users

{
  //import { DataGrid } from '@mui/x-data-grid'
  /* <DataGrid
getRowId={(row) => Number(row.id)}
rows={[
  users.map((user) => ({
    id: user.id,
    name: user.name,
    blogN: user.blogs.length,
  })),
]}
columns={[
  { field: 'name', headerName: 'Name' },
  { field: 'blogN', headerName: 'blogs created' },
]}
initialState={{
  pagination: {
    paginationModel: { page: 0, pageSize: 5 },
  },
}}
pageSizeOptions={[5, 10]}
checkboxSelection
/> */
}

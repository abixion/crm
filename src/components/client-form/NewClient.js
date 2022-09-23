import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import * as Yup from "yup";
import Iconify from "../Iconify";


export const NewClient = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("UserName is required"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    SelectRole: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required").min(5),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      SelectRole: "",
    },
    validationSchema: LoginSchema,

    onSubmit: (values) => {
console.log(values)
    },
  });

  const { handleSubmit } = formik;


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
        New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form style={{ width: "570px" }} onSubmit={handleSubmit} autoComplete="off" >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="User Name"
                  type="text"
                  fullWidth
                  name="username"
                  error={formik.errors.username}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                  name="email"
                  error={formik.errors.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  fullWidth
                  name="password"
                  error={formik.errors.password}
                  value={formik.values.password}
                  onChange={formik.handleChange}  
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id=""
                  label="Role"
                  type="text"
                  fullWidth
                  name="SelectRole"
                  error={formik.errors.SelectRole}
                  value={formik.values.SelectRole}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add User</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

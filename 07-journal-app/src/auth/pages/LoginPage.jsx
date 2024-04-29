import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from 'react-redux'
import { checkingAuthentication, startGoogleSingIn } from "../../store/auth/thunks";

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm({
    email: 'fernando@google.com',
    password: '123456'
  })

  const dispatch = useDispatch();

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( checkingAuthentication() )
    console.log({email, password})
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
    console.log('onGoogleSingIn');
  }

  return (
    <AuthLayout title="Login">  {/*Se coloca el layout que reemplaza la una parte de la pagina de registro y login y se le pasa la prop title para distinguir entre el login y registro  */}
      <form onSubmit={ onSubmit } > 
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={ onInputChange }
              value={ email }
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={ onInputChange }
              value={ password }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth onClick={ onGoogleSingIn }>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>

          {/*Este "Link" que se importa de "material" es de estilos, el "RouterLink" es el de react que esta sobrescrito con un apodo*/}
          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Link component={RouterLink} color="inherit" to={"/auth/register"}>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

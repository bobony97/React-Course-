/*
    GoogleAuthProvider: Importa el proveedor de autenticación de Google de Firebase.
    signInWithPopup: Importa la función signInWithPopup de Firebase Authentication para abrir un popup de autenticación de Google.
    FirebaseAuth: Importa el objeto FirebaseAuth desde un archivo de configuración ("./config").
*/
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

//Creación del proveedor de Google: Se crea una instancia de GoogleAuthProvider y se asigna a la variable googleProvider.
const googleProvider = new GoogleAuthProvider();

//Se define una función asíncrona signInWithGoogle que manejará el proceso de inicio de sesión con Google.
export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider); //utilizando el proveedor de Google y el objeto FirebaseAuth importado anteriormente.
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, photoURL, uid } = result.user;

        //Si el inicio de sesión tiene éxito, se extraen los detalles del usuario (displayName, email, photoURL, uid) del resultado y se devuelve un objeto con ok: true y estos datos.
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        /*
            Si ocurre un error durante el inicio de sesión, se captura en el bloque catch, se obtienen el código de error (errorCode) y el mensaje de error (errorMessage) y se devuelve 
            un objeto con ok: false, errorCode y errorMessage.
        */
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}
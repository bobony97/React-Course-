import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../journal/components/ImageGallery'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { setActiveNote } from '../store/auth/journal/journalSlice'
import { startSaveNote } from '../store/auth/journal/thunks'

export const NoteView = () => {

    const { active:note } = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const { body, title, onInputChange, formState, date } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }
  return (
    <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }} className="animate__animated animate__fadeIn animate__faster">
        <Grid item>
            <Typography fontSize={39} fontWeight={'light'} > { dateString } </Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{ p: 2 }} onClick={onSaveNote} >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un titulo'
                label='Titulo'
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Qué sucedió en el dia de hoy?'
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <ImageGallery />

    </Grid>
  )
}

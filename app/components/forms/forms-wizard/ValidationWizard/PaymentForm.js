import React, { useState } from 'react';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import TextField_Component from './Form_TextField.js';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import PaymentFormChild from './PaymentForm_Child.js';
import { v4 as uuidv4 } from 'uuid'; // uuid para generar identificadores únicos

const validationSchema = yup.object({
    fecha_despacho: yup
        .date()
        .nullable()
        .transform((curr, orig) => orig === '' ? null : curr)
        .required('La fecha de despacho es obligatoria')
        .typeError('Debe ser una fecha válida'), // Mensaje para un valor que no sea una fecha válida
    sku: yup
        .string()
        .required('El SKU es obligatorio'),
    denominacion: yup
        .string()
        .required('La denominación es obligatoria'),
    tipo_de_bien: yup
        .string()
        .required('El tipo de bien es obligatorio'),
    costo_usd: yup
        .number()
        .positive('El costo debe ser un número positivo')
        .required('El costo en USD es obligatorio')
        .typeError('Debe ser un valor numérico'), // Mensaje para un valor que no sea numérico
    cantidad: yup
        .number()
        .positive('La cantidad debe ser un número positivo')
        .integer('La cantidad debe ser un número entero')
        .required('La cantidad es obligatoria')
        .typeError('Debe ser un valor numérico'), // Mensaje para un valor que no sea numérico
});


// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function PaymentForm({ partidaItemData, setPartidaItemData, handleNext, handleBack, setErrorIndex, encabezadosData }) {

    const initialValues = {
        purchase_order: '',
        fecha_despacho: '',
        sku: '',
        denominacion: '',
        tipo_de_bien: '',
        costo_usd: '',
        cantidad: '',
      };
    // Estado inicial con un formulario único
    const [formStates, setFormStates] = useState([
        // Inicializa el primer formulario con un ID único y valores iniciales
        { id: uuidv4(), formData: initialValues } // initialValues debe ser tu objeto con los valores iniciales para cada formulario
      ]);

    // Función para actualizar los datos de un formulario específico
    const updateFormState = (id, newFormData) => {
        setFormStates(currentStates => currentStates.map(formState => 
            formState.id === id ? { ...formState, formData: newFormData } : formState
        ));
    };

    //Función para añadir diversos formularios
    const addFormChild = () => {
        setFormStates(currentStates => [...currentStates, { id: uuidv4(), formData: initialValues }]);
    };
    //Función para eliminar campos por ID
    const removeFormChild = (idToRemove) => {
        //Una vez que se ejecuta
        setFormStates(currentStates => currentStates.filter(formState => formState.id !== idToRemove));
    };
    

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            setPartidaItemData(formStates); // Asumiendo que esta función actualiza el estado en el abuelo correctamente

            handleNext();
        }
    });


    console.log("VALORES EN ARRAY:");
    console.log(formStates);
    
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Detalles Costo
            </Typography>
            
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}> 
                    {formStates.map((formState)  => (
                        <PaymentFormChild
                            key={formState.id}
                            id={formState.id} //Iteramos el id del array de formStates para que c/u sea único
                            formik={formik}
                            formData={formState.formData}
                            updateFormState={updateFormState}                        
                            handleNext={handleNext}
                            handleBack={handleBack}
                            setErrorIndex={setErrorIndex}
                            removeForm={() => removeFormChild(formState.id)} //Pasamos por parámetro la función.
                            canRemove={formStates.length > 1} //Añadimos para que NO pueda remover si es menor a 1

                        />
                    ))}
                    <Grid item xs={12}>
                        <Button onClick={addFormChild}>Añadir otro formulario</Button>

                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

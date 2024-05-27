// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import TextField_Component from './Form_TextField.js';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';


// ==============================|| FORM WIZARD - VALIDATION  ||============================== //
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

export default function PaymentFormChild({ handleNext, handleBack, setErrorIndex, key, id, removeForm, canRemove, formData, updateFormState }) {
    
    const formik_hijo = useFormik({
        initialValues: formData,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            updateFormState(id, formik_hijo.values);
        }
    });

    const handleLocalChange = (e) => {
        // Manejo del cambio por formik_hijo
        formik_hijo.handleChange(e);
        // Luego, notifica al componente padre sobre el cambio
        const { name, value } = e.target;
        formik_hijo.setFieldValue(name, value);
        formik_hijo.setFieldTouched(name, true, false);
        // Esta función debería existir en tu componente padre y ser pasada como prop
        updateFormState(id, { ...formik_hijo.values, [name]: value });
    };


    /* useEffect(() => {
        // Aquí asumimos que deseas enviar todo el estado del formulario al padre
        console.log("Enviando info del hijo al padre");
        updateFormState(id, formik_hijo.values);
    }, [formik_hijo.values, id, updateFormState]); */

    console.log("formik Componente hijo");
    console.log(formik_hijo);

    const listado_sku_prov = ['947-II', '9502+(2)', '9502+N95', '9542(1)', 'A2', 'A830L', 'AB003', 'AB003.REAC', 'AB004', 'AB004.REAC', 'AB005', 'AB005-ROJO',]

    // export default function Input_Form_Payment({ id, name, label, value, onChange, error, helperText, autoComplete, optiones}) {

    return (
        <>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="purchase_order"
                            param_name="purchase_order"
                            param_label="purchase_order"
                            param_value={formik_hijo.values.purchase_order}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.purchase_order && Boolean(formik_hijo.errors.purchase_order)}
                            param_helperText={formik_hijo.touched.purchase_order && formik_hijo.errors.purchase_order}
                            autoComplete={false}
                            options={['']}
                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                    <TextField_Component
                            param_id="fecha_despacho"
                            param_name="fecha_despacho"
                            param_label="fecha_despacho"
                            param_value={formik_hijo.values.fecha_despacho}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.fecha_despacho && Boolean(formik_hijo.errors.fecha_despacho)}
                            param_helperText={formik_hijo.touched.fecha_despacho && formik_hijo.errors.fecha_despacho}
                            autoComplete={false}
                            options={['']}
                            

                        /> 
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="sku"
                            param_name="sku"
                            param_label="sku"
                            param_value={formik_hijo.values.sku}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.sku && Boolean(formik_hijo.errors.sku)}
                            param_helperText={formik_hijo.touched.sku && formik_hijo.errors.sku}
                            autoComplete={true}
                            options={listado_sku_prov}
                            param_onChange_Options={formik_hijo.setFieldValue}
                            param_onBlur_Options={formik_hijo.setFieldTouched}
                            

                        />
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="denominacion"
                            param_name="denominacion"
                            param_label="denominacion"
                            param_value={formik_hijo.values.denominacion}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.denominacion && Boolean(formik_hijo.errors.denominacion)}
                            param_helperText={formik_hijo.touched.denominacion && formik_hijo.errors.denominacion}
                            autoComplete={false}
                            options={['']}
                            

                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="tipo_de_bien"
                            param_name="tipo_de_bien"
                            param_label="tipo_de_bien"
                            param_value={formik_hijo.values.tipo_de_bien}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.tipo_de_bien && Boolean(formik_hijo.errors.tipo_de_bien)}
                            param_helperText={formik_hijo.touched.tipo_de_bien && formik_hijo.errors.tipo_de_bien}
                            autoComplete={false}
                            options={['']}
                            

                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="costo_usd"
                            param_name="costo_usd"
                            param_label="costo_usd"
                            param_value={formik_hijo.values.costo_usd}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.costo_usd && Boolean(formik_hijo.errors.costo_usd)}
                            param_helperText={formik_hijo.touched.costo_usd && formik_hijo.errors.costo_usd}
                            autoComplete={false}
                            options={['']}
                            

                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                        <TextField_Component
                            param_id="cantidad"
                            param_name="cantidad"
                            param_label="cantidad"
                            param_value={formik_hijo.values.cantidad}
                            param_onChange={handleLocalChange}
                            param_error={formik_hijo.touched.cantidad && Boolean(formik_hijo.errors.cantidad)}
                            param_helperText={formik_hijo.touched.cantidad && formik_hijo.errors.cantidad}
                            autoComplete={false}
                            options={['']}
                            

                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        {canRemove && (
                            <Button onClick={removeForm} color="error">
                                X
                            </Button>
                        )}
                    </Grid>
        </>
    );
}

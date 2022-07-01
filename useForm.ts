import { FormEvent, useEffect, useState } from 'react'

export function useForm<T extends object>({ defaultValues, resolver }: { defaultValues: T, resolver?: any }) {
    const [formValue, setFormValue] = useState<T>(defaultValues);
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState<any>({});


    useEffect(() => {
        resolveValidation();
        return () => { } // Revisar como limpiar el useEffect
    }, [formValue]);

    const resolveValidation = async () => {
        let errors: any = {};
        try {
            await resolver.validate(formValue, { abortEarly: false });
            setIsError(false);
            setMessageError({});
        } catch (error: any) {
            setIsError(true);
            error.inner?.map((err: any) => {
                if (formValue[err.path as keyof T] !== '' as any) {
                    errors[err.path] = err.message;
                }
            });

            setMessageError(errors);
        }
    }


    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.type === 'file') {
            handleInputFileChange(event);
        } else if (event.currentTarget.type === 'checkbox') {
            handleInputCheckboxChange(event);
        } else {
            handleInputChange(event);
        }
    }

    const handleInputChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [currentTarget.name]: currentTarget.value
        })
    }

    const handleInputFileChange = ({ currentTarget: { name, files } }: FormEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [name]: files && files[0]
        })
    }
    const handleInputCheckboxChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [currentTarget.name]: currentTarget.checked
        })
    }
    const cleanFormValues = () => setFormValue(defaultValues);
    const resetInputValue = (name: keyof T) => setFormValue({ ...formValue, [name]: '' })
    return {
        formValue,
        isError,
        messageError,
        handleChange,
        cleanFormValues,
        resetInputValue
    }
}




import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from "./NoteForm.module.css"
interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}


interface NoteFormProps {
    onClose:()=> void;
}


const validationSchema = Yup.object( {
    title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Заголовок обов’язковий"),

    content: Yup.string()
    .trim()
    .max(500, "Максимум 500 символів"),


    tag: Yup.mixed<"Todo"| "Work"| "Personal"| "Meeting"| "Shopping">()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Тег обов’язковий")


})



function NoteForm ({onClose}: NoteFormProps)  {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (note: NoteFormValues) => createNote(note),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ["notes"]});
            onClose();
        }
    });

    const initialValues: NoteFormValues = {
        title: "",
        content: "",
        tag: "Todo"
    }

    return (

        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=> mutation.mutate(values)}
        >
            {({isSubmitting}) => (
        <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isSubmitting}
    >
      Create note
    </button>
  </div>
</Form>
            )}
</Formik>

    )
}
export default NoteForm;
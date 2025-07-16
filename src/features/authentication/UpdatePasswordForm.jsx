import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const {
    user: { username },
  } = useUser();

  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password, username }) {
    updateUser({ password, username }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Шифра">
        <Input
          id="username"
          value={username}
          disabled
          {...register("username", {
            required: "Поље је обавезно",
          })}
        />
      </FormRow>
      <FormRow
        label="Лозинка (мин. 8 карактера)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Поље је обавезно",
            minLength: {
              value: 8,
              message: "Лозинка је мин. 8 карактера",
            },
          })}
        />
      </FormRow>

      <FormRow label="Потврди лозинку" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Поље је обавезно",
            validate: (value) =>
              getValues().password === value || "Лозинке се не поклапају",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Откажи
        </Button>
        <Button disabled={isUpdating}>Сачувај</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

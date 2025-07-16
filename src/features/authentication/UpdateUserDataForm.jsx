import { useState } from "react";

import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: { full_name, username },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullNameU, setFullNameU] = useState(full_name);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullNameU) return;
    updateUser(
      { fullNameU, username },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullNameU(full_name);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Шифра">
        <Input value={username} disabled />
      </FormRow>
      <FormRow label="Име и презиме">
        <Input
          type="text"
          value={fullNameU}
          onChange={(e) => setFullNameU(e.target.value)}
          id="fullNameU"
        />
      </FormRow>
      {/* <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow> */}
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Одустани
        </Button>
        <Button>Сачувај</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

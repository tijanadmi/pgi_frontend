import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FormColumn from "../../ui/FormColumn";

import { useCreateRoom } from "./useCreateRoom";
import { useEditRoom } from "./useEditRoom";

function CreateRoomForm({ roomToEdit = {}, onCloseModal }) {
  const { isCreating, createRoom } = useCreateRoom();
  const { isEditing, editRoom } = useEditRoom();
  const isWorking = isCreating || isEditing;

  const { room_id: editId, ...editValues } = roomToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession){
      console.log("Edit room");
      editRoom(
        { newRoomData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
    else{
    console.log("Create room");
      createRoom(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  // return (
  //   <Form onSubmit={handleSubmit(onSubmit, onError)}>
  //     <FormRow label="Room name (Serbian)" error={errors?.room_name_sr?.message}>
  //       <Input
  //         type="text"
  //         id="room_name_sr"
  //         disabled={isWorking}
  //         {...register("room_name_sr", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Room name (English)" error={errors?.room_name_en?.message}>
  //       <Input
  //         type="text"
  //         id="room_name_en"
  //         disabled={isWorking}
  //         {...register("room_name_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Room name (Bulgarian)" error={errors?.room_name_bg?.message}>
  //       <Input
  //         type="text"
  //         id="room_name_bg"
  //         disabled={isWorking}
  //         {...register("room_name_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (Serbian)"
  //       error={errors?.room_shortdes_sr?.message}
  //     >
  //       <Textarea
  //         id="room_shortdes_sr"
  //         disabled={isWorking}
  //         {...register("room_shortdes_sr", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (English)"
  //       error={errors?.room_shortdes_en?.message}
  //     >
  //       <Textarea
  //         id="room_shortdes_en"
  //         disabled={isWorking}
  //         {...register("room_shortdes_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (Bulgarian)"
  //       error={errors?.room_shortdes_bg?.message}
  //     >
  //       <Textarea
  //         id="room_shortdes_bg"
  //         disabled={isWorking}
  //         {...register("room_shortdes_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (Serbian)" error={errors?.room_des_sr?.message}>
  //       <Textarea
  //         id="room_des_sr"
  //         disabled={isWorking}
  //         {...register("room_des_sr", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (English)" error={errors?.room_des_en?.message}>
  //       <Textarea
  //         id="room_des_en"
  //         disabled={isWorking}
  //         {...register("room_des_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (Bulgarian)" error={errors?.room_des_bg?.message}>
  //       <Textarea
  //         id="room_des_bg"
  //         disabled={isWorking}
  //         {...register("room_des_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Pictures folder"
  //       error={errors?.room_pictures_folder?.message}
  //     >
  //       <Input
  //         type="text"
  //         id="room_pictures_folder"
  //         disabled={isWorking}
  //         {...register("room_pictures_folder", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Number of guests"
  //       error={errors?.room_guest_number?.message}
  //     >
  //       <Input
  //         type="number"
  //         id="room_guest_number"
  //         disabled={isWorking}
  //         {...register("room_guest_number", {
  //           required: "This field is required",
  //           min: {
  //             value: 1,
  //             message: "Guest number must be at least 1",
  //           },
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Price" error={errors?.room_price_en?.message}>
  //       <Input
  //         type="number"
  //         id="room_price_en"
  //         disabled={isWorking}
  //         {...register("room_price_en", {
  //           required: "This field is required",
  //           min: {
  //             value: 1,
  //             message: "Price must be at least 1",
  //           },
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow>
  //       <Button variation="secondary" type="reset">
  //         Cancel
  //       </Button>
  //       <Button disabled={isWorking}>
  //         {isEditSession ? "Edit room" : "Create new room"}
  //       </Button>
  //     </FormRow>
  //   </Form>
  // );
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
    >

      {/* Komponenta sa 3 kolone */}
      <FormColumn label="Room names" >
        <FormRow  error={errors?.room_name_sr?.message}>
        <Input
          type="text"
          id="room_name_sr"
          disabled={isWorking}
          placeholder="Room name (Serbian)"
          {...register("room_name_sr", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_name_en?.message}>
        <Input
          type="text"
          id="room_name_en"
          disabled={isWorking}
          placeholder="Room name (English)"
          {...register("room_name_en", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_name_bg?.message}>
        <Input
          type="text"
          id="room_name_bg"
          disabled={isWorking}
          placeholder="Room name (Bulgarian)"
          {...register("room_name_bg", { required: "This field is required" })}
        />
        </FormRow>
      </FormColumn>

      {/* Opis sa 3 kolone */}
      <FormColumn label="Short descriptions" >
      <FormRow  error={errors?.room_shortdes_sr?.message}>
        <Textarea
          id="room_shortdes_sr"
          disabled={isWorking}
          placeholder="Short description (Serbian)"
          {...register("room_shortdes_sr", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_shortdes_en?.message}>
        <Textarea
          id="room_shortdes_en"
          disabled={isWorking}
          placeholder="Short description (English)"
          {...register("room_shortdes_en", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_shortdes_bg?.message}>
        <Textarea
          id="room_shortdes_bg"
          disabled={isWorking}
          placeholder="Short description (Bulgarian)"
          {...register("room_shortdes_bg", { required: "This field is required" })}
        />
        </FormRow>
      </FormColumn>

      {/* Opis (duži) sa 3 kolone */}
      <FormColumn label="Descriptions">
      <FormRow  error={errors?.room_des_sr?.message}>
        <Textarea
          id="room_des_sr"
          disabled={isWorking}
          placeholder="Description (Serbian)"
          {...register("room_des_sr", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_des_en?.message}>
        <Textarea
          id="room_des_en"
          disabled={isWorking}
          placeholder="Description (English)"
          {...register("room_des_en", { required: "This field is required" })}
        />
        </FormRow>
        <FormRow  error={errors?.room_des_bg?.message}>
        <Textarea
          id="room_des_bg"
          disabled={isWorking}
          placeholder="Description (Bulgarian)"
          {...register("room_des_bg", { required: "This field is required" })}
        />
        </FormRow>
      </FormColumn>

      {/* Ostali podaci */}
      <FormRow label="Pictures folder" error={errors?.room_pictures_folder?.message}>
        <Input
          type="text"
          id="room_pictures_folder"
          disabled={isWorking}
          {...register("room_pictures_folder", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.room_guest_number?.message}>
        <Input
          type="number"
          id="room_guest_number"
          disabled={isWorking}
          {...register("room_guest_number", {
            required: "This field is required",
            min: { value: 1, message: "Guest number must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.room_price_en?.message}>
        <Input
          type="number"
          id="room_price_en"
          disabled={isWorking}
          {...register("room_price_en", {
            required: "This field is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </FormRow>

      {/* Dugmad */}
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit room" : "Create new room"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

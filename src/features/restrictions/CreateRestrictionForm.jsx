import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FormColumn from "../../ui/FormColumn";

import { useCreateRestriction } from "./useCreateRestriction";
import { useEditRestriction } from "./useEditRestriction";

function CreateRestrictionForm({ restrictionToEdit = {}, onCloseModal }) {
  const { isCreating, createRestriction } = useCreateRestriction();
  const { isEditing, editRestriction } = useEditRestriction();
  const isWorking = isCreating || isEditing;

  const { restriction_id: editId, ...editValues } = restrictionToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession){
      console.log("Edit restriction");
      editRestriction(
        { newRestrictionData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
    else{
    console.log("Create restriction");
      createRestriction(
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
  //     <FormRow label="restriction name (Serbian)" error={errors?.restriction_name_sr?.message}>
    //     <Input
    //       type="text"
    //       id="restriction_name_sr"
    //       disabled={isWorking}
    //       {...register("restriction_name_sr", {
    //         required: "This field is required",
    //       })}
    //     />
    //   </FormRow>

  //     <FormRow label="restriction name (English)" error={errors?.restriction_name_en?.message}>
  //       <Input
  //         type="text"
  //         id="restriction_name_en"
  //         disabled={isWorking}
  //         {...register("restriction_name_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="restriction name (Bulgarian)" error={errors?.restriction_name_bg?.message}>
  //       <Input
  //         type="text"
  //         id="restriction_name_bg"
  //         disabled={isWorking}
  //         {...register("restriction_name_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (Serbian)"
  //       error={errors?.restriction_shortdes_sr?.message}
  //     >
  //       <Textarea
  //         id="restriction_shortdes_sr"
  //         disabled={isWorking}
  //         {...register("restriction_shortdes_sr", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (English)"
  //       error={errors?.restriction_shortdes_en?.message}
  //     >
  //       <Textarea
  //         id="restriction_shortdes_en"
  //         disabled={isWorking}
  //         {...register("restriction_shortdes_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Short description (Bulgarian)"
  //       error={errors?.restriction_shortdes_bg?.message}
  //     >
  //       <Textarea
  //         id="restriction_shortdes_bg"
  //         disabled={isWorking}
  //         {...register("restriction_shortdes_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (Serbian)" error={errors?.restriction_des_sr?.message}>
  //       <Textarea
  //         id="restriction_des_sr"
  //         disabled={isWorking}
  //         {...register("restriction_des_sr", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (English)" error={errors?.restriction_des_en?.message}>
  //       <Textarea
  //         id="restriction_des_en"
  //         disabled={isWorking}
  //         {...register("restriction_des_en", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Description (Bulgarian)" error={errors?.restriction_des_bg?.message}>
  //       <Textarea
  //         id="restriction_des_bg"
  //         disabled={isWorking}
  //         {...register("restriction_des_bg", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Pictures folder"
  //       error={errors?.restriction_pictures_folder?.message}
  //     >
  //       <Input
  //         type="text"
  //         id="restriction_pictures_folder"
  //         disabled={isWorking}
  //         {...register("restriction_pictures_folder", {
  //           required: "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Number of guests"
  //       error={errors?.restriction_guest_number?.message}
  //     >
  //       <Input
  //         type="number"
  //         id="restriction_guest_number"
  //         disabled={isWorking}
  //         {...register("restriction_guest_number", {
  //           required: "This field is required",
  //           min: {
  //             value: 1,
  //             message: "Guest number must be at least 1",
  //           },
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Price" error={errors?.restriction_price_en?.message}>
  //       <Input
  //         type="number"
  //         id="restriction_price_en"
  //         disabled={isWorking}
  //         {...register("restriction_price_en", {
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
  //         {isEditSession ? "Edit restriction" : "Create new restriction"}
  //       </Button>
  //     </FormRow>
  //   </Form>
  // );
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}>
    <FormRow label="restriction name (Serbian)" error={errors?.restriction_name_sr?.message}>
        <Input
          type="text"
          id="restriction_name_sr"
          disabled={isWorking}
          {...register("restriction_name_sr", {
            required: "This field is required",
          })}
        />
    </FormRow>

    <FormRow label="restriction name (English)" error={errors?.restriction_name_en?.message}>
        <Input
          type="text"
          id="restriction_name_en"
          disabled={isWorking}
          {...register("restriction_name_en", {
            required: "This field is required",
          })}
        />
    </FormRow>

    <FormRow label="restriction name (Bulgarian)" error={errors?.restriction_name_bg?.message}>
        <Input
          type="text"
          id="restriction_name_bg"
          disabled={isWorking}
          {...register("restriction_name_bg", {
            required: "This field is required",
          })}
        />
    </FormRow>

      {/* Dugmad */}
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit restriction" : "Create new restriction"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRestrictionForm;

import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Textarea from "../../ui/Textarea";
import ModalHeader from "../../ui/ModalHeader";
import FormRow from "../../ui/FormRow";
import FormColumn from "../../ui/FormColumn";
import FieldGroup from "../../ui/FieldGroup";
import FieldGroupLabel from "../../ui/FieldGroupLabel";
import DateTimePicker from "../../ui/DateTimePicker";
import DateTimePicker24h from "../../ui/DateTimePicker24h";
import { dotDateTimeToInput, inputToDotDateTime } from "../../utils/helpers.js";
import MrcsForInsertSearchSelect from "../../features/lovs/MrcsForInsertSearchSelect";
import ObjTSRPSearchSelect from "../../features/lovs/ObjTSRPSearchSelect";

// import TipPrekSearchSelect from "../../features/lovs/TipPrekSearchSelect";
// import VrstaPrekSelect from "../lovs/VrstaPrekSelect";
import VrstaPrekSearchSelect from "../lovs/VrstaPrekSearchSelect";
import UzrokPrekSearchSelect from "../../features/lovs/UzrokPrekSearchSelect";

import PodUzrokPrekSearchSelect from "../../features/lovs/PodUzrokPrekSearchSelect";
import MernaMestaSearchSelect from "../../features/lovs/MernaMestaSearchSelect";

// import {useUzrokPrek} from "../../features/lovs/useUzrokPrek";

import { useCreateDDNInterruptionOfDeliveryK } from "./useCreateDDNInterruptionOfDeliveryK";
import { useEditDDNInterruptionOfDeliveryK } from "./useEditDDNInterruptionOfDeliveryK";
import FormRowVertical from "../../ui/FormRowVertical";



function CreateIntOfDeliveryKForm({ interruptionOfDeliveryKToEdit = {}, onCloseModal }) {
  const { isCreating, createInterruptionOfUsers } =
    useCreateDDNInterruptionOfDeliveryK();

  const { isEditing, editInterruptionOfUsers } = useEditDDNInterruptionOfDeliveryK();
  const isWorking = isCreating || isEditing;

  const { id: editId, version, ...editValues } = interruptionOfDeliveryKToEdit;
  const isEditSession = Boolean(editId);

  const VRSTA_NEPLANIRAN_ID = 2;
  const UZROK_EMS_ID = 1;

  const FORM_FIELDS = [
  "id_s_mrc",
  "ob_id",
  "id_tipob",
  "vrepoc",
  "vrezav",
  // "trajanje",
  "snaga",
  "opis",
  "id_s_vr_prek",
  "id_s_uzrok_prek",
  "id_s_poduzrok_prek",
];

  
  // const { register, handleSubmit, reset, watch, control, formState } = useForm();
  const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  watch,
  formState,
} = useForm({
  defaultValues: isEditSession
    ? {
        id_s_mrc: editValues.id_s_mrc || "",
        ob_id: editValues.ob_id || "",
        id_tipob: editValues.id_tipob || "",
        vrepoc: editValues.vrepoc || "",
        vrezav: editValues.vrezav || "",
        snaga: editValues.snaga || "",
        opis: editValues.opis || "",
        id_s_vr_prek: editValues.id_s_vr_prek || "",
        id_s_uzrok_prek: editValues.id_s_uzrok_prek || "",
        id_s_poduzrok_prek: editValues.id_s_poduzrok_prek || "",
      }
    : {
        id_s_vr_prek: "",        
        id_s_uzrok_prek: "",
        id_s_poduzrok_prek: "",
        vrepoc: "",
        vrezav: "",
        snaga: "",
        opis: "",
        
      },
});

useEffect(() => {
  // if (!isEditSession) return;

  if (!editId) return;

  const valuesForForm = FORM_FIELDS.reduce((acc, key) => {
    acc[key] = editValues[key] ?? "";
    return acc;
  }, {});

  reset(valuesForForm);
}, [editId, reset]);

  const { errors } = formState;

  const mrcId = useWatch({
    control,
    name: "id_s_mrc",
  });

  const obId = useWatch({
    control,
    name: "ob_id",
  });

  // za uslovnu validaciju
  const vrstaPrekId = useWatch({
    control,
    name: "id_s_vr_prek",
  });

  const uzrokPrekId = useWatch({
    control,
    name: "id_s_uzrok_prek",
  });

  const isNeplaniran = Number(vrstaPrekId) === VRSTA_NEPLANIRAN_ID;
  const isEMS = Number(uzrokPrekId) === UZROK_EMS_ID;


  function onSubmit(data) {
    console.log("id_tipob:", data.id_tipob);
    console.log("ob_id:", data.ob_id);

    const payload = {
    ...data,
    id_s_mrc: Number(data.id_s_mrc),
    id_tipob: Number(data.id_tipob),
    ob_id: Number(data.ob_id),
    id_s_vr_prek: Number(data.id_s_vr_prek),
    id_s_uzrok_prek: Number(data.id_s_uzrok_prek || 0),
    id_s_poduzrok_prek: Number(data.id_s_poduzrok_prek || 0),
    id_s_merna_mesta: Number(data.id_s_merna_mesta || 0),
    // broj_mesta: Number(data.broj_mesta || 0),
    
  };

  if (isEditSession) {
    editInterruptionOfUsers(
      {
        newInterruption: payload,
        id: editId,
        version: version,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  } else {
    createInterruptionOfUsers(payload, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }
  }

  function onError() {}

  return (
    <Form
   
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Osnovni identifikatori */}
      <input
        type="hidden"
        {...register("id_tipob", {
        required: "Tip objekta je obavezan",
        })}
      />
     

       <ModalHeader
    title={isEditSession ? "Измена прекида корисника" : "Унос прекида корисника"}
    
    onClick={() => onCloseModal?.()}
  />
      <FormColumn  columns={7} gap="1rem">
        
{/* <FormRowVertical label="Време почетка" span={1} error={errors?.vrepoc?.message}>
  <Controller
    name="vrepoc"
    control={control}
    rules={{ required: "Време почетка је обавезно" }}
    render={({ field }) => (
      <DateTimePicker24h
        value={field.value}
        onChange={field.onChange}
        disabled={isCreating}
      />
    )}
  />
</FormRowVertical>

<FormRowVertical label="Време завршетка" span={1} error={errors?.vrezav?.message}>
  <Controller
    name="vrezav"
    control={control}
    render={({ field }) => (
      <DateTimePicker24h
        value={field.value}
        onChange={field.onChange}
        disabled={isCreating}
      />
    )}
  />
</FormRowVertical> */}

<FieldGroup span={1}>
  <FieldGroupLabel>Време прекида</FieldGroupLabel>
  <FormRowVertical
    error={errors?.vrepoc?.message}
  >
    <Controller
      name="vrepoc"
      control={control}
      rules={{ required: "Време почетка је обавезно" }}
      render={({ field }) => (
        <DateTimePicker24h
          value={field.value}
          onChange={field.onChange}
          disabled={isCreating}
        />
      )}
    />
  </FormRowVertical>

  <FormRowVertical
    error={errors?.vrezav?.message}
  >
    <Controller
      name="vrezav"
      control={control}
      render={({ field }) => (
        <DateTimePicker24h
          value={field.value}
          onChange={field.onChange}
          disabled={isCreating}
        />
      )}
    />
  </FormRowVertical>
</FieldGroup>



        <FormRowVertical label="РДЦ" boldLabel span={2} error={errors?.id_s_mrc?.message}>
  <Controller
    name="id_s_mrc"
    control={control}
    rules={{ required: "РДЦ је обавезан" }}
    render={({ field }) => (
      <MrcsForInsertSearchSelect
        value={field.value}
        onChange={(val) => {
          field.onChange(val);
          setValue("id_tipob", "");
          setValue("ob_id", "");
        }}
        isDisabled={isCreating}
      />
    )}
  />
</FormRowVertical>

<FormRowVertical
  label="Електроенергетски објекат"
  boldLabel
  span={2}
  error={errors?.ob_id?.message}
>
  <Controller
    name="ob_id"
    control={control}
    rules={{ required: "Објекат је обавезан" }}
    render={({ field }) => (
      <ObjTSRPSearchSelect
        mrcId={mrcId}                 // ✅ useWatch
        value={field.value}
        onChange={(opt) => {
            field.onChange(opt?.value ?? "");        // ob_id
            setValue("id_tipob", opt?.id_tipob ?? ""); // 👈 SAD RADI
            
        }}
        isDisabled={!mrcId || isCreating}
      />
    )}
  />
</FormRowVertical>



      </FormColumn>

      {/* Vrsta i uzrok */}
      <FormColumn columns={26} gap="1rem">
        
        <FormRowVertical label="Врста прекида" boldLabel span={8} error={errors?.id_s_vr_prek?.message}>
  <Controller
    name="id_s_vr_prek"
    control={control}
    rules={{ required: "Врста прекида је обавезна" }}
    render={({ field }) => (
      <VrstaPrekSearchSelect
        value={field.value}
        onChange={(val) => {
            field.onChange(val);
            setValue("id_s_uzrok_prek", "");
            setValue("id_s_poduzrok_prek", "");
            // resetuj Uzrok i Poduzrok kad se Vrsta menja
          // setValue("id_s_uzrok_prek", "", { shouldValidate: true, shouldDirty: true });
          // setValue("id_s_poduzrok_prek", "", { shouldValidate: true, shouldDirty: true });
        }}
        isDisabled={isCreating}
      />
    )}
  />
</FormRowVertical>
      

      <FormRowVertical
  label="Узрок прекида"
  boldLabel
  span={8}
  error={errors?.id_s_uzrok_prek?.message}
>
  <Controller
  name="id_s_uzrok_prek"
  control={control}
  rules={{
    validate: (value) =>
      !isNeplaniran || !!value || "Узрок је обавезан када је врста непланиран",
  }}
  render={({ field }) => (
    <UzrokPrekSearchSelect
      value={field.value}     // ID
      
      // onChange={(newValue) => {
      //   field.onChange(newValue);   // 👈 ID
      //   setValue("id_s_poduzrok_prek", "", {
      //     shouldValidate: true,
      //     shouldDirty: true,
      //   });
      // }}
      onChange={(val) => {
          field.onChange(val);
          setValue("id_s_poduzrok_prek", "");
        }}
      isDisabled={isCreating || !isNeplaniran}
    />
  )}
/>
</FormRowVertical>



<FormRowVertical
  label="Подузрок прекида"
  boldLabel
  span={8}
  error={errors?.id_s_poduzrok_prek?.message}
>
  <Controller
  name="id_s_poduzrok_prek"
  control={control}
  rules={{
    validate: (value) =>
      !isEMS || !!value || "Pодузрок је обавезан када је узрок EMS",
  }}
  render={({ field }) => (
    <PodUzrokPrekSearchSelect
      value={field.value} // ID
      onChange={field.onChange}
      isDisabled={isCreating || !isNeplaniran || !isEMS}
    />
  )}
/>
</FormRowVertical>




<FormRowVertical
  label="Снага" boldLabel span={2} error={errors?.snaga?.message}
>
 <Input
          type="text"
          disabled={isCreating}
          {...register("snaga")}
        />
</FormRowVertical>

<FormRowVertical
  label="Назив мерног места"
  boldLabel
  span={8}
  error={errors?.id_s_merna_mesta?.message}
>
  <Controller
  name="id_s_merna_mesta"
  control={control}
  render={({ field }) => (
    <MernaMestaSearchSelect
      value={field.value} // ID
      onChange={field.onChange}
    />
  )}
/>
</FormRowVertical>




<FormRowVertical
  label="Број ММ" boldLabel span={2} error={errors?.broj_mesta?.message}
>
 <Input
          type="text"
          disabled={isCreating}
          {...register("broj_mesta")}
        />
</FormRowVertical>

      </FormColumn>

      {/* Dodatni podaci */}


      <FormRowVertical label="Опис" boldLabel>
        <Textarea
          height="15rem"
          disabled={isCreating}
          {...register("opis")}
        />
      </FormRowVertical>

      {/* Dugmad */}
      <FormRow>
        <ButtonGroup>
  <Button
     variation="secondary"
    type="reset"
    size="medium"
    onClick={() => onCloseModal?.()}
  >
    Одустани
  </Button>

  <Button
    size="medium"
    disabled={isWorking}
    variation="primary"
    type="submit"
  >
    {isEditSession ? "Измени прекид" : "Сачувај прекид"}
  </Button>
</ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreateIntOfDeliveryKForm;

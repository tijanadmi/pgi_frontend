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
import ObjHETEVESearchSelect from "../../features/lovs/ObjHETEVESearchSelect";

import PoljaGESearchSelect from "../../features/lovs/PoljaGESearchSelect";
// import TipPrekSearchSelect from "../../features/lovs/TipPrekSearchSelect";
// import VrstaPrekSelect from "../lovs/VrstaPrekSelect";
import PodVrstaPrekSearchSelect from "../lovs/PodVrstaPrekSearchSelect";
import UzrokPrekSearchSelect from "../../features/lovs/UzrokPrekSearchSelect";

import PodUzrokPrekSearchSelect from "../../features/lovs/PodUzrokPrekSearchSelect";

// import {useUzrokPrek} from "../../features/lovs/useUzrokPrek";

import { useCreateDDNInterruptionOfDeliveryP } from "./useCreateDDNInterruptionOfDeliveryP";
import { useEditDDNInterruptionOfDeliveryP } from "./useEditDDNInterruptionOfDeliveryP";
import FormRowVertical from "../../ui/FormRowVertical";



function CreateIntOfDeliveryPForm({ interruptionOfDeliveryPToEdit = {}, onCloseModal }) {
  const { isCreating, createInterruptionOfProduction } =
    useCreateDDNInterruptionOfDeliveryP();

  const { isEditing, editInterruptionOfProduction } = useEditDDNInterruptionOfDeliveryP();
  const isWorking = isCreating || isEditing;

  const { id: editId, version, ...editValues } = interruptionOfDeliveryPToEdit;
  const isEditSession = Boolean(editId);

  const VRSTA_NEPLANIRAN_ID = 2;
  const UZROK_EMS_ID = 1;
  const UZROK_VISA_SILA_ID = 4;

  const FORM_FIELDS = [
  "id_s_mrc",
  "ob_id",
  "p2_traf_id",
  "id_tipob",
  "id_tip_objekta_ndc",
  "id_tip_dogadjaja_ndc",
  "vrepoc",
  "vrezav",
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
        p2_traf_id: editValues.p2_traf_id || "",
        id_tipob: editValues.id_tipob || "",
        id_tip_objekta_ndc: editValues.id_tip_objekta_ndc || "",
        id_tip_dogadjaja_ndc: editValues.id_tip_dogadjaja_ndc || "",
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
        p2_traf_id: "",
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
  const isVisaSila = Number(uzrokPrekId) === UZROK_VISA_SILA_ID;


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
    p2_traf_id: Number(data.p2_traf_id || 0),
  };

  if (isEditSession) {
    editInterruptionOfProduction(
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
    createInterruptionOfProduction(payload, {
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
      <input
        type="hidden"
        {...register("id_tip_objekta_ndc", {
        required: "id_tip_objekta_ndc je obavezan",
        })}
      />
      <input
        type="hidden"
        {...register("id_tip_dogadjaja_ndc", {
        required: "id_tip_dogadjaja_ndc je obavezan",
        })}
      />

       <ModalHeader
    title={isEditSession ? "Измена прекида производње" : "Унос прекида производње"}
    
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
  label="Објекат (HE / TE / VE)"
  boldLabel
  span={2}
  error={errors?.ob_id?.message}
>
  <Controller
    name="ob_id"
    control={control}
    rules={{ required: "Објекат је обавезан" }}
    render={({ field }) => (
      <ObjHETEVESearchSelect
        mrcId={mrcId}                 // ✅ useWatch
        value={field.value}
        onChange={(opt) => {
            field.onChange(opt?.value ?? "");        // ob_id
            setValue("id_tipob", opt?.id_tipob ?? ""); // 👈 SAD RADI
            setValue("p2_traf_id", "");
        }}
        isDisabled={!mrcId || isCreating}
      />
    )}
  />
</FormRowVertical>

<FormRowVertical label="Поље" boldLabel span={2} error={errors?.p2_traf_id?.message}>
  <Controller
    name="p2_traf_id"
    control={control}
    // rules={{ required: "Поље је обавезно" }}
    render={({ field }) => (
      <PoljaGESearchSelect
        obId={obId}                 // 👈 KLJUČNO
        value={field.value}
        onChange={(val) => {
          field.onChange(val);
        }}
        isDisabled={!obId || isCreating}
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
      <PodVrstaPrekSearchSelect
        value={field.value}
        onChange={(opt) => {
            field.onChange(opt?.value ?? ""); 
            setValue("id_tip_objekta_ndc", opt?.id_tip_objekta_ndc ?? "");
            setValue("id_tip_dogadjaja_ndc", opt?.id_tip_dogadjaja_ndc ?? "");
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
      !isEMS || !isVisaSila || !!value || "Подузрок је обавезан када је узрок ЕМС или Виша сила",
  }}
  render={({ field }) => (
    <PodUzrokPrekSearchSelect
      value={field.value} // ID
      onChange={field.onChange}
      isDisabled={isCreating || !isNeplaniran || (!isEMS && !isVisaSila)}
      uzrokPrekId={uzrokPrekId}
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
    variation="ghost"
    type="button"
    size="medium"
    onClick={() => onCloseModal?.()}
  >
    Одустани
  </Button>

  <Button
    type="submit"
    size="medium"
    disabled={isWorking}
    variation="primary"
  >
    {isEditSession ? "Измени прекид" : "Сачувај прекид"}
  </Button>
</ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreateIntOfDeliveryPForm;

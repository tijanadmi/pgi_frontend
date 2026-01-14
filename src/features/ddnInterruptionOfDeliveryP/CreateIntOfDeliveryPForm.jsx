import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FormColumn from "../../ui/FormColumn";
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
  formState,
} = useForm({
  // defaultValues: {
  //   id_s_vr_prek: "",        // ili 2 ako je default Nepalniran
  //   id_s_uzrok_prek: "",
  //   id_s_poduzrok_prek: "",
  // },
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

//   useEffect(() => {
//   console.log("vrstaPrekId:", vrstaPrekId);
//   console.log("isNeplaniran:", isNeplaniran);
// }, [vrstaPrekId, isNeplaniran]);

// useEffect(() => {
//   console.log("uzrokPrekId:", uzrokPrekId);
//   console.log("isEMS:", isEMS);
// }, [uzrokPrekId, isEMS]);

  // const idSVrPrek = watch("id_s_vr_prek");
  // const idSUzrokPrek = watch("id_s_uzrok_prek");

  function onSubmit(data) {
    console.log("id_tipob:", data.id_tipob);
    console.log("ob_id:", data.ob_id);
    // createInterruptionOfProduction(
    //   {
    //     ...data,
    //     id_s_mrc: Number(data.id_s_mrc),
    //     id_tipob: Number(data.id_tipob),
    //     ob_id: Number(data.ob_id),
    //     id_s_vr_prek: Number(data.id_s_vr_prek),
    //     id_s_uzrok_prek: Number(data.id_s_uzrok_prek || 0),
    //     id_s_poduzrok_prek: Number(data.id_s_poduzrok_prek || 0),
    //     p2_traf_id: Number(data.p2_traf_id || 0),
    //   },
    //   {
    //     onSuccess: () => {
    //       reset();
    //       onCloseModal?.();
    //     },
    //   }
    // );

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
      <FormColumn label="Osnovni podaci">
        
        {/* <FormRow error={errors?.id_s_mrc?.message}>
          <Controller
            name="id_s_mrc"
            control={control}
            rules={{ required: "Obavezno polje" }}
            render={({ field }) => (
              <MrcSelect
                value={field.value}
                onChange={field.onChange}
                disabled={isCreating}
              />
            )}
          />
        </FormRow> */}

        <FormRowVertical label="Mrc" error={errors?.id_s_mrc?.message}>
  <Controller
    name="id_s_mrc"
    control={control}
    rules={{ required: "Mrc je obavezan" }}
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
  label="Objekat (HE / TE / VE)"
  error={errors?.ob_id?.message}
>
  <Controller
    name="ob_id"
    control={control}
    rules={{ required: "Objekat je obavezan" }}
    render={({ field }) => (
      <ObjHETEVESearchSelect
        mrcId={mrcId}                 // ✅ useWatch
        value={field.value}
        // onChange={(val) => {
        //   field.onChange(val);
        //   setValue("id_tipob", opt?.id_tipob ?? "");
        //   setValue("id_polja", "");
        // }}
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

<FormRowVertical label="Polje" error={errors?.p2_traf_id?.message}>
  <Controller
    name="p2_traf_id"
    control={control}
    rules={{ required: "Polje je obavezno" }}
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




        {/* <FormRow error={errors?.id_tipob?.message}>
          <Input
            type="number"
            placeholder="Tip objekta"
            disabled={isCreating}
            {...register("id_tipob", { required: "Obavezno polje" })}
          />
        </FormRow>

        <FormRow error={errors?.ob_id?.message}>
          <Input
            type="number"
            placeholder="Objekat ID"
            disabled={isCreating}
            {...register("ob_id", { required: "Obavezno polje" })}
          />
        </FormRow> */}
      </FormColumn>

      {/* Vreme */}
      <FormColumn label="Vreme">
        {/* <FormRow error={errors?.vrepoc?.message}>
          <Input
            type="text"
            placeholder="Vreme početka (dd.mm.yyyy hh:mm)"
            disabled={isCreating}
            {...register("vrepoc", {
              required: "Vreme početka je obavezno",
            })}
          />
        </FormRow>

        <FormRow error={errors?.vrezav?.message}>
          <Input
            type="text"
            placeholder="Vreme završetka (dd.mm.yyyy hh:mm)"
            disabled={isCreating}
            {...register("vrezav")}
          />
        </FormRow> */}
        <FormRow error={errors?.vrepoc?.message}>
  <Controller
    name="vrepoc"
    control={control}
    rules={{ required: "Vreme početka je obavezno" }}
    render={({ field }) => (
      <DateTimePicker24h
        value={field.value}
        onChange={field.onChange}
        disabled={isCreating}
      />
    )}
  />
</FormRow>

<FormRow error={errors?.vrezav?.message}>
  <Controller
    name="vrezav"
    control={control}
    // rules={{ required: "Vreme završetka je obavezno" }}
    render={({ field }) => (
      <DateTimePicker24h
        value={field.value}
        onChange={field.onChange}
        disabled={isCreating}
      />
    )}
  />
</FormRow>


{/* <FormRow error={errors?.vrezav?.message}>
  <Controller
    name="vrezav"
    control={control}
    render={({ field }) => (
      <DateTimePicker
        value={field.value}
        onChange={field.onChange}
        disabled={isCreating}
      />
    )}
  />
</FormRow> */}

      </FormColumn>

      {/* Vrsta i uzrok */}
      <FormColumn label="Vrsta i uzrok prekida">
        {/* <FormRow error={errors?.id_s_vr_prek?.message}>
          <Input
            type="number"
            placeholder="Vrsta prekida"
            disabled={isCreating}
            {...register("id_s_vr_prek", {
              required: "Vrsta prekida je obavezna",
            })}
          />
        </FormRow> */}

        <FormRowVertical label="Vrsta prekida" error={errors?.id_s_vr_prek?.message}>
  <Controller
    name="id_s_vr_prek"
    control={control}
    rules={{ required: "Vrsta prekida je obavezna" }}
    render={({ field }) => (
      <PodVrstaPrekSearchSelect
        value={field.value}
        onChange={(opt) => {
            field.onChange(opt?.value ?? ""); 
            setValue("id_tip_objekta_ndc", opt?.id_tip_objekta_ndc ?? "");
            setValue("id_tip_dogadjaja_ndc", opt?.id_tip_dogadjaja_ndc ?? "");
            setValue("id_s_uzrok_prek", "");
            setValue("id_s_poduzrok_prek", "");
        }}
        isDisabled={isCreating}
      />
    )}
  />
</FormRowVertical>

        {/* <FormRow error={errors?.id_s_uzrok_prek?.message}>
          <Input
            type="number"
            placeholder="Uzrok prekida"
            disabled={isCreating}
            {...register("id_s_uzrok_prek", {
              validate: (value) =>
                idSVrPrek === "1" || value
                  ? true
                  : "Uzrok je obavezan za ovu vrstu prekida",
            })}
          />
        </FormRow> */}

        {/* <FormRow error={errors?.id_s_vr_prek?.message}>
        <Controller
            name="id_s_uzrok_prek"
            control={control}
            rules={{ required: "Uzrok prekida je obavezan" }}
            render={({ field }) => (
              <UzrokPrekSelect
                value={field.value}
                onChange={field.onChange}
                disabled={isCreating}
              />
            )}
          />
        </FormRow> */}

        <FormRowVertical label="Uzrok prekida" error={errors?.id_s_uzrok_prek?.message}>
  <Controller
    name="id_s_uzrok_prek"
    control={control}
    rules={{
      validate: (value) =>
         !isNeplaniran || value || "Uzrok je obavezan za neplaniran prekid",
    }}
    render={({ field }) => (
      <UzrokPrekSearchSelect
        value={field.value}
        onChange={(val) => {
          field.onChange(val);
          // field.onChange(val);
          setValue("id_s_poduzrok_prek", "");
          // reset({
          //   ...watch(),
          //   id_s_poduzrok_prek: "",
          // });
        }}
        isDisabled={isCreating || !isNeplaniran}
      />
    )}
  />
</FormRowVertical>


        {/* <FormRow error={errors?.id_s_poduzrok_prek?.message}>
          <Input
            type="number"
            placeholder="Poduzrok prekida"
            disabled={isCreating}
            {...register("id_s_poduzrok_prek", {
              validate: (value) =>
                idSUzrokPrek !== "1" || value
                  ? true
                  : "Poduzrok je obavezan kada je uzrok = 1",
            })}
          />
        </FormRow> */}
        {/* <FormRow error={errors?.id_s_vr_prek?.message}>
        <Controller
            name="id_s_poduzrok_prek"
            control={control}
            rules={{ required: "Uzrok prekida je obavezan" }}
            render={({ field }) => (
              <PodUzrokPrekSelect
                value={field.value}
                onChange={field.onChange}
                disabled={isCreating}
              />
            )}
          />
        </FormRow> */}
        <FormRowVertical
  label="Poduzrok prekida"
  error={errors?.id_s_poduzrok_prek?.message}
>
  <Controller
    name="id_s_poduzrok_prek"
    control={control}
    rules={{
      validate: (value) =>
        !isEMS || value || "Poduzrok je obavezan kada je uzrok EMS",
    }}
    render={({ field }) => (
      <PodUzrokPrekSearchSelect
        value={field.value}
        onChange={field.onChange}
        isDisabled={isCreating || !isNeplaniran || !isEMS}
      />
    )}
  />
</FormRowVertical>

      </FormColumn>

      {/* Dodatni podaci */}
      <FormRow label="Snaga">
        <Input
          type="text"
          disabled={isCreating}
          {...register("snaga")}
        />
      </FormRow>

      {/* <FormRow label="Trafostanica ID">
        <Input
          type="number"
          disabled={isCreating}
          {...register("p2_traf_id")}
        />
      </FormRow> */}

      <FormRow label="Opis">
        <Textarea
          disabled={isCreating}
          {...register("opis")}
        />
      </FormRow>

      {/* Dugmad */}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* <Button disabled={isCreating}>
          Sačuvaj prekid
        </Button> */}
        <Button disabled={isWorking}>
          {isEditSession ? "Izmeni prekid" : "Sačuvaj prekid"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateIntOfDeliveryPForm;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Dropdown, Button, Modal } from "carbon-components-react";
import { Location24, Time24 } from "@carbon/icons-react";
import Loader from "react-loader-spinner";
import {
  formatDate,
  formatRoomInfo,
  formatToDbDateString,
  formatDateAddingHourAndHalf,
} from "./utils";
import { fetchPersons } from "../queries/RoomQueries";
import { useMutation, useQueryClient } from "react-query";
import { postReservation } from "../queries/RoomQueries";

const ModalCreateForm = ({
  open,
  setOpen,
  navigateToCreate,
  dateInfo,
  buildings,
}) => {
  const [responsible, setResponsible] = useState("");
  const persons = fetchPersons();

  const queryClient = useQueryClient();

  // const onFormSubmit = async (data) => {
  //   await mutateAsync({ ...data })
  //   queryClient.invalidateQueries('reservations')
  //   setOpen(false)
  // }

  const mutation = useMutation((data) => {
    console.log("izveletie dati cap", data);

    const newObj = {
      title: data.title,
      start: data.start,
      end: data.end,
      responsiblePersonId: data.responsiblePersonId,
      resourceId: data.resourceId,
    };

    console.log("NOSUTAM:", newObj);

    postReservation({
      data: newObj,
    });

    // queryClient.invalidateQueries('reservations')

    // if (!isEmptyObj(itemContent)) {
    //   // then update capacity
    //   patchProjectDescCapacity({
    //     data: newObj,
    //     modalMeta: {
    //       setShow: setShow,
    //       setContent: setContent,
    //       capacityList: capacityList,
    //       kapacitatesId: itemContent.kapacitatesID,
    //     },
    //   })
    // } else {
    //   // else post capacity
    //   postProjectDescCapacity({
    //     data: newObj,
    //     modalMeta: {
    //       setShow: setShow,
    //       setContent: setContent,
    //       capacityList: capacityList,
    //     },
    //   })
    // }
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      start: "",
      end: "",
      responsiblePersonId: null,
      resourceId: null,
    },
  });

  setValue("start", dateInfo.dateStr);
  setValue("end", formatDateAddingHourAndHalf(dateInfo));
  setValue("resourceId", dateInfo.resource.id);

  const submitModal = async (data) => {
    // console.log('dataMMMM', data)
    await mutation.mutateAsync(data);
    queryClient.invalidateQueries("reservations");
    setOpen(false);
  };

  return (
    !persons.isLoading && (
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Pievienot jaunu notikumu"
        primaryButtonText="Pievienot"
        secondaryButtonText="Vairāk info"
        onRequestSubmit={handleSubmit((data) => {
          submitModal(data);
        })}
        onSecondarySubmit={() => {
          setOpen(!open);
        }}
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div style={{ marginBottom: "1rem" }}>
              <TextInput
                {...field}
                data-modal-primary-focus
                className="nosaukums-input"
                id="text-input-2"
                labelText="Nosaukums"
                placeholder="Ievadiet nosaukumu"
              />
            </div>
          )}
        />
        <div className="parent" style={{ marginBottom: "1rem" }}>
          <>
            <Time24 className="modal-icon" />
            <span style={{ marginLeft: "0.5rem" }}>{formatDate(dateInfo)}</span>
          </>
        </div>
        <div className="parent" style={{ marginBottom: "1rem" }}>
          <>
            <Location24 className="modal-icon" />
            <span style={{ marginLeft: "0.5rem" }}>
              {formatRoomInfo(dateInfo, buildings)}
            </span>
          </>
        </div>
        <Controller
          control={control}
          name="responsiblePersonId"
          render={({ field }) => (
            <div style={{ marginBottom: "1rem" }}>
              <Dropdown
                {...field}
                className="atbildigais-input"
                id="default"
                titleText="Atbildīgais"
                label="Izvēlieties"
                items={persons.data}
                itemToString={(item) => (item ? item.fullname : "")}
                onChange={({ selectedItem }) => {
                  setResponsible(selectedItem);
                  setValue("responsiblePersonId", selectedItem.id);
                }}
                selectedItem={responsible}
              />
            </div>
          )}
        />
        {/* <div>
            <>
              <Button
                type="submit"
                size="sm"
                className="pievienot-button"
                iconDescription="Add"
              >
                {isLoading ? (
                  <Loader type="ThreeDots" color="#fff" height={10} />
                ) : (
                  'Pievienot'
                )}
              </Button>
              <Button
                kind="ghost"
                size="sm"
                className="info-button"
                iconDescription="Info"
                onClick={navigateToCreate}
              >
                Vairāk info
              </Button>
            </>
          </div> */}
      </Modal>
    )
  );
};

export default ModalCreateForm;

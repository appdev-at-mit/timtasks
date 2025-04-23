import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "primereact/editor";

const IssueCreation = (props) => {
  {
    /*
    TODO:
      - replace const variables below with props (user's project names/issue types) or query them from db
      - figure out how to store rich text editor/attachments
      - what other features/fields do we want/need?
      - handle cancelling the form
      - send data to db
      - lots of styling
    */
  }
  const projectList = ["Project 1", "Project 2"];
  const issueTypes = ["Bug", "To-Do"];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handle form submission
  const onSubmit = (data) => {
    // TODO: send data to db
    console.log("Form submitted:", data);
    reset();
  };

  const handleCancel = () => {
    // TODO: close the popup
    console.log("Form cancelled");
    reset();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "75vh",
          backgroundColor: "Gainsboro",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "30px", marginBottom: "25px" }}>Create Issue</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 70px)",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              paddingBottom: "20px",
            }}
          >
            {/* dropdown of user's projects */}
            <div style={{ fontSize: "18px" }}>
              <div>Project</div>
              <select
                {...register("project")}
                style={{ width: "40%", padding: "10px", margin: "5px", fontSize: "15px" }}
              >
                {projectList.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: "18px" }}>
              <div>Issue Type</div>
              <select
                {...register("issueType")}
                style={{ width: "40%", padding: "10px", margin: "5px", fontSize: "15px" }}
              >
                {issueTypes.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: "18px" }}>
              <div>Issue Name</div>
              <input
                required
                maxLength={40}
                minLength={1}
                {...register("issueName")}
                style={{ width: "40%", padding: "10px", margin: "5px", fontSize: "15px" }}
              />
            </div>

            <div style={{ fontSize: "18px" }}>
              <div>Summary</div>
              <input
                required
                minLength={1}
                {...register("summary")}
                style={{ width: "70%", padding: "10px", fontSize: "15px" }}
              />
            </div>

            <div style={{ fontSize: "18px" }}>
              <div>Description</div>
              <div style={{ backgroundColor: "LightGrey" }}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Editor
                      value={field.value}
                      onTextChange={(e) => field.onChange(e.htmlValue)}
                      style={{ height: "320px", backgroundColor: "white", fontSize: "15px" }}
                    />
                  )}
                />
                {errors.description && (
                  <small style={{ color: "red" }}>{errors.description.message}</small>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "right",
              bottom: "0",
            }}
          >
            <button
              type="submit"
              style={{
                height: "50px",
                width: "100px",
                borderRadius: "5px",
                backgroundColor: "RoyalBlue",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Create
            </button>

            <div>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  height: "50px",
                  width: "100px",
                  borderRadius: "5px",
                  backgroundColor: "LightGray",
                  color: "black",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueCreation;
